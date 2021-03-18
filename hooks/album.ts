import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "../lib/toast";
import request from "../lib/request";
import { QUERY_ALBUM } from "../lib/const";

interface AlbumByIdResponse {
  code?: number;
  msg?: string;
  resourceState?: boolean;
  album?: object;
  songs?: unknown[];
}

export const useQueryAlbum = (id?: string) => {
  return useQuery<AlbumByIdResponse>(
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
        setAlbumInfo(album);
        setAlbumSongs(songs);
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
