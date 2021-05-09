import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "./../lib/request";
import { toast } from "../lib/toast";
import { tupleNum } from "../lib/type";
import { QUERY_SEARCH } from "../lib/const";
import { useSong } from "./index";
import { isTrackPlayable } from "../lib/util";

const SearchTypes = tupleNum(
  1, //  单曲
  10, //  专辑
  100, //  歌手
  1000, //  歌单
  1002, //  用户
  1004, //   MV
  1006, //   歌词
  1009, //   电台
  1014, //   视频
  1018 //  综合
);
type SearchType = typeof SearchTypes[number];

interface BaseQuerySearchResponse<T> {
  code?: number;
  result?: T;
}

interface QuerySearchSongsResponse
  extends BaseQuerySearchResponse<{
    hasMore?: boolean;
    songCount?: number;
    songs?: any[];
  }> {}

interface QuerySearchAlbumsResponse
  extends BaseQuerySearchResponse<{
    albums?: any[];
    albumCount?: number;
  }> {}

interface QuerySearchArtistsResponse
  extends BaseQuerySearchResponse<{
    hasMore?: boolean;
    artistCount?: number;
    artists?: any[];
  }> {}

interface QuerySearchPlaylistsResponse
  extends BaseQuerySearchResponse<{
    hasMore?: boolean;
    playlistCount?: number;
    playlists?: any[];
  }> {}

interface QuerySearchMVsResponse
  extends BaseQuerySearchResponse<{
    mvCount?: number;
    mvs?: any[];
  }> {}

interface QuerySearchUsersResponse
  extends BaseQuerySearchResponse<{
    hasMore?: boolean;
    userprofileCount?: number;
    userprofiles?: any[];
  }> {}

interface QuerySearchParams {
  keywords: string;
  type?: SearchType;
  limit?: number;
  offset?: number;
}

export const useQuerySearch = <T>(params: QuerySearchParams) => {
  return useQuery<T>(
    [QUERY_SEARCH.KEY, { params }],
    () => request.get(QUERY_SEARCH.URL, { params }),
    {
      enabled: Boolean(params?.keywords),
    }
  );
};

export const useSearchSongs = (params: QuerySearchParams) => {
  const [searchSongsRes, setSearchSongsRes] = useState<{
    hasMore?: boolean;
    songCount?: number;
    songs?: any[];
  }>(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [songIds, setSongIds] = useState([]);

  const { data, ...queryProps } = useQuerySearch<QuerySearchSongsResponse>({
    ...params,
    type: 1,
  });

  const { songs } = useSong(songIds);

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        const ids = result?.songs?.map((song) => song.id);
        setSongIds(ids);

        setSearchSongsRes({
          hasMore: result?.hasMore,
          songCount: result.songCount,
        });
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSongIds, setSearchSongsRes, setErrorMsg, toast]);

  useEffect(() => {
    const formatSongs = songs.map((song) => {
      return {
        ...song,
        ...isTrackPlayable(song),
      };
    });

    setSearchSongsRes((value) => {
      return {
        ...value,
        songs: formatSongs,
      };
    });
  }, [songs, setSearchSongsRes]);

  return {
    searchSongsRes,
    setSearchSongsRes,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useSearchAlbums = (params: QuerySearchParams) => {
  const [searchAlbumsRes, setSearchAlbumsRes] = useState<{
    albumCount?: number;
    albums?: any[];
  }>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySearch<QuerySearchAlbumsResponse>({
    ...params,
    type: 10,
  });

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setSearchAlbumsRes(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSearchAlbumsRes, setErrorMsg, toast]);

  return {
    searchAlbumsRes,
    setSearchAlbumsRes,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useSearchArtists = (params: QuerySearchParams) => {
  const [searchArtistsRes, setSearchArtistsRes] = useState<{
    hasMore?: boolean;
    artistCount?: number;
    artists?: any[];
  }>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySearch<QuerySearchArtistsResponse>({
    ...params,
    type: 100,
  });

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setSearchArtistsRes(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSearchArtistsRes, setErrorMsg, toast]);

  return {
    searchArtistsRes,
    setSearchArtistsRes,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useSearchPlaylists = (params: QuerySearchParams) => {
  const [searchPlaylistsRes, setSearchPlaylistsRes] = useState<{
    hasMore?: boolean;
    playlistCount?: number;
    playlists?: any[];
  }>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySearch<QuerySearchPlaylistsResponse>({
    ...params,
    type: 1000,
  });

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setSearchPlaylistsRes(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSearchPlaylistsRes, setErrorMsg, toast]);

  return {
    searchPlaylistsRes,
    setSearchPlaylistsRes,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useSearchMVs = (params: QuerySearchParams) => {
  const [searchMVsRes, setSearchMVsRes] = useState<{
    mvCount?: number;
    mvs?: any[];
  }>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySearch<QuerySearchMVsResponse>({
    ...params,
    type: 1004,
  });

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setSearchMVsRes(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSearchMVsRes, setErrorMsg, toast]);

  return {
    searchMVsRes,
    setSearchMVsRes,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useSearchUsers = (params: QuerySearchParams) => {
  const [searchUsersRes, setSearchUsersRes] = useState<{
    hasMore?: boolean;
    userprofileCount?: number;
    userprofiles?: any[];
  }>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySearch<QuerySearchUsersResponse>({
    ...params,
    type: 1002,
  });

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setSearchUsersRes(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSearchUsersRes, setErrorMsg, toast]);

  return {
    searchUsersRes,
    setSearchUsersRes,
    errorMsg,
    data,
    ...queryProps,
  };
};
