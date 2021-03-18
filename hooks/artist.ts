import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "./../lib/request";
import { toast } from "../lib/toast";
import {
  QUERY_ARTIST,
  QUERY_ARTIST_MV,
  QUERY_ARTIST_ALBUM,
  QUERY_ARTIST_LIST,
  QUERY_SIMI_ARTIST,
  QUERY_TOP_ARTISTS,
} from "../lib/const";

interface BaseQueryParams {
  id?: string;
  limit?: number;
  offset?: number;
}

interface QueryArtistListParams extends BaseQueryParams {
  type?: number;
  area?: number;
  initial?: string;
}

interface QueryArtistResponse {
  code?: number;
  artist?: object;
  more?: boolean;
  hotSongs?: unknown[];
}

interface QueryArtistMVResponse {
  code?: number;
  hasMore?: boolean;
  time?: number;
  mvs?: any[];
}

interface QueryArtistAlbumResponse {
  code?: number;
  more?: boolean;
  artist?: unknown;
  hotAlbums?: any[];
}

interface QueryArtistListResponse {
  code?: number;
  more?: boolean;
  artists?: any[];
}

interface QuerySimiArtistResponse {
  code?: number;
  artists?: unknown[];
}

interface QueryTopArtistsResponse {
  code?: number;
  more?: boolean;
  artists?: any[];
}

export const useQueryArtist = (id?: string) => {
  return useQuery<QueryArtistResponse>(
    [QUERY_ARTIST.KEY, { id }],
    () => request.get(QUERY_ARTIST.URL, { params: { id } }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useArtist = (id?: string) => {
  const [artist, setArtist] = useState(null);
  const [hotSongs, setHotSongs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryArtist(id);

  useEffect(() => {
    if (data) {
      const { code, artist, hotSongs } = data;
      if (code === 200) {
        setArtist(artist);
        setHotSongs(hotSongs);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setArtist, setHotSongs, setErrorMsg, toast]);

  return {
    artist,
    setArtist,
    hotSongs,
    setHotSongs,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryArtistMV = (params?: BaseQueryParams) => {
  return useQuery<QueryArtistMVResponse>(
    [QUERY_ARTIST_MV.KEY, params],
    () => request.get(QUERY_ARTIST_MV.URL, { params }),
    {
      enabled: Boolean(params?.id),
    }
  );
};

export const useArtistMV = (params?: BaseQueryParams) => {
  const [mvs, setMVs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryArtistMV(params);

  useEffect(() => {
    if (data) {
      const { code, mvs } = data;
      if (code === 200) {
        setMVs(mvs);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setMVs, setErrorMsg, toast]);

  return {
    mvs,
    setMVs,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryArtistAlbum = (params?: BaseQueryParams) => {
  return useQuery<QueryArtistAlbumResponse>(
    [QUERY_ARTIST_ALBUM.KEY, params],
    () => request.get(QUERY_ARTIST_ALBUM.URL, { params }),
    {
      enabled: Boolean(params?.id),
    }
  );
};

export const useArtistAlbum = (params?: BaseQueryParams) => {
  const [singleAlbums, setSingleAlbums] = useState([]);
  const [defaultAlbums, setDefaultAlbums] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryArtistAlbum(params);

  useEffect(() => {
    if (data) {
      const { code, hotAlbums } = data;
      if (code === 200) {
        const sAlbums = [];
        const dAlbums = [];
        hotAlbums.forEach((item) => {
          if (item.type !== "专辑") {
            sAlbums.push(item);
          } else {
            dAlbums.push(item);
          }
        });

        setSingleAlbums(sAlbums);
        setDefaultAlbums(dAlbums);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSingleAlbums, setDefaultAlbums, setErrorMsg, toast]);

  return {
    singleAlbums,
    setSingleAlbums,
    defaultAlbums,
    setDefaultAlbums,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryArtistList = (params?: QueryArtistListParams) => {
  return useQuery<QueryArtistListResponse>(
    [QUERY_ARTIST_LIST.KEY, params],
    () => request.get(QUERY_ARTIST_LIST.URL, { params }),
    {}
  );
};

export const useArtistList = (params?: QueryArtistListParams) => {
  const [artistList, setArtistList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryArtistList(params);

  useEffect(() => {
    if (data) {
      const { code, artists } = data;
      if (code === 200) {
        setArtistList(artists);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setArtistList, setErrorMsg, toast]);

  return {
    artistList,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQuerySimiArtist = (id?: string) => {
  return useQuery<QuerySimiArtistResponse>(
    [QUERY_SIMI_ARTIST.KEY, { id }],
    () => request.get(QUERY_SIMI_ARTIST.URL, { params: { id } }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useSimiArtist = (id?: string) => {
  const [similarArtists, setSimilarArtists] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySimiArtist(id);

  useEffect(() => {
    if (data) {
      const { code, artists } = data;
      if (code === 200) {
        setSimilarArtists(artists);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSimilarArtists, setErrorMsg, toast]);

  return {
    similarArtists,
    setSimilarArtists,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryTopArtists = (params?: BaseQueryParams) => {
  return useQuery<QueryTopArtistsResponse>(
    [QUERY_TOP_ARTISTS.KEY, params],
    () => request.get(QUERY_TOP_ARTISTS.URL, { params }),
    {}
  );
};

export const useTopArtists = (params?: BaseQueryParams) => {
  const [topArtists, setTopArtists] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryTopArtists(params);

  useEffect(() => {
    if (data) {
      const { code, artists } = data;
      if (code === 200) {
        setTopArtists(artists);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setTopArtists, setErrorMsg, toast]);

  return { topArtists, errorMsg, data, ...queryProps };
};
