import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "../lib/toast";
import request from "../lib/request";
import { QUERY_ALBUM, QUERY_ALBUM_NEWEST, QUERY_ALBUM_NEW } from "../lib/const";
import { tuple } from "./../lib/type";
import { isTrackPlayable } from "../lib/util";

interface QueryAlbumResponse {
  code?: number;
  msg?: string;
  resourceState?: boolean;
  album?: object;
  songs?: any[];
}

interface QueryAlbumNewestResponse {
  code?: number;
  albums?: any[];
}

interface QueryAlbumNewResponse {
  code?: number;
  total?: number;
  albums?: any[];
}

const AlbumNewAreas = tuple("ALL", "ZH", "EA", "KR", "JP");
export type AlbumNewArea = typeof AlbumNewAreas[number];

interface QueryAlbumNewParams {
  limit?: number;
  offset?: number;
  area?: AlbumNewArea;
}

export const useQueryAlbum = (id?: string) => {
  return useQuery<QueryAlbumResponse>(
    [QUERY_ALBUM.KEY, { id }],
    () =>
      request.get(QUERY_ALBUM.URL, {
        // todo 改变这里为 params: id 可以对接口报错，然后可以查看 ErrorContainer 的样式
        params: { id },
      }),
    {
      enabled: Boolean(id),
      // staleTime: 1000 * 60,
    }
  );
};

export const useAlbum = (id?: string) => {
  const [albumInfo, setAlbumInfo] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryAlbum(id);

  useEffect(() => {
    if (data) {
      const { code, album, songs } = data;
      if (code === 200) {
        const formatSongs = songs.map((song) => {
          return {
            ...song,
            ...isTrackPlayable(song),
          };
        });

        setAlbumInfo(album);
        setAlbumSongs(formatSongs);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setAlbumInfo, setAlbumSongs, setErrorMsg, toast]);

  return {
    albumInfo,
    albumSongs,
    setAlbumInfo,
    setAlbumSongs,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryNewestAlbum = () => {
  return useQuery<QueryAlbumNewestResponse>(
    [QUERY_ALBUM_NEWEST.KEY],
    () => request.get(QUERY_ALBUM_NEWEST.URL),
    {}
  );
};

export const useNewestAlbum = () => {
  const [newestAlbums, setNewestAlbums] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryNewestAlbum();

  useEffect(() => {
    if (data) {
      const { code, albums } = data;
      if (code === 200) {
        setNewestAlbums(albums);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setNewestAlbums, setErrorMsg, toast]);

  return {
    newestAlbums,
    setNewestAlbums,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryNewAlbum = (params: QueryAlbumNewParams) => {
  return useQuery<QueryAlbumNewResponse>(
    [QUERY_ALBUM_NEW.KEY, { params }],
    () => request.get(QUERY_ALBUM_NEW.URL, { params }),
    {}
  );
};

export const useNewAlbum = (params: QueryAlbumNewParams) => {
  const [newAlbums, setNewAlbums] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryNewAlbum(params);

  useEffect(() => {
    if (data) {
      const { code, albums, total } = data;
      if (code === 200) {
        setTotal(total);
        setNewAlbums(albums);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setTotal, setNewAlbums, setErrorMsg, toast]);

  return {
    newAlbums,
    setNewAlbums,
    total,
    setTotal,
    errorMsg,
    data,
    ...queryProps,
  };
};
