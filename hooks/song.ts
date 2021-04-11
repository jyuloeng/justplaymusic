import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import request from "./../lib/request";
import { toast } from "../lib/toast";
import {
  QUERY_SONG,
  QUERY_PERSONALIZED_NEWSONG,
  QUERY_RECOMMEND_SONGS,
  QUERY_SONG_DETAIL,
  MUTATE_LIKED_LIST,
  QUERY_LYRIC,
} from "../lib/const";
import { isLoginByAccount } from "../lib/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentSong } from "../store/slice/song.slice";
import { setLikedList, setRefreshTimestamp } from "../store/slice/user.slice";
import { selectLikedList } from "./../store/slice/user.slice";
import { lyricParser, lyricWithTranslation } from "./../lib/util";
import { QualityType, selectQuality } from "../store/slice/settings.slice";

interface QuerySongResponse {
  code?: number;
  songs?: any[];
  privileges?: any[];
}

interface QueryPersonalizedSongResponse {
  code?: number;
  category?: number;
  result?: any[];
}

interface QueryRecommendSongResponse {
  code?: number;
  data?: {
    dailySongs?: any[];
    orderSongs?: any[];
    recommendReasons?: any[];
  };
}

interface QuerySongDetailParams {
  id?: string | number;
  br?: QualityType;
}

interface QuerySongDetailResponse {
  code?: number;
  data: any;
}

interface MutateLikeSongParams {
  id?: number | string;
  like?: boolean;
}

interface MutateLikeSongResponse {
  code?: number;
  playlistId?: number;
  songs?: any[];
}

interface QueryLyricResponse {
  code?: number;
  sgc?: boolean;
  sfy?: boolean;
  qfy?: boolean;
  lrc?: any[];
  klyric?: any[];
  tlyric?: any[];
}

export const useQuerySong = (ids: number[]) => {
  return useQuery<QuerySongResponse>(
    [QUERY_SONG.KEY, { ids: ids.join(",") }],
    () =>
      request.get(QUERY_SONG.URL, {
        params: {
          ids: ids.join(","),
        },
      }),

    {
      enabled: ids.length > 0,
    }
  );
};

export const useSong = (ids: number[]) => {
  const [songs, setSongs] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQuerySong(ids);

  useEffect(() => {
    if (data) {
      const { code, songs, privileges } = data;
      if (code === 200) {
        setSongs(songs);
        setPrivileges(privileges);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setSongs, setPrivileges, setErrorMsg, toast]);

  return {
    songs,
    setSongs,
    privileges,
    setPrivileges,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryPersonalizedSong = (limit?: number) => {
  return useQuery<QueryPersonalizedSongResponse>(
    [QUERY_PERSONALIZED_NEWSONG.KEY, { limit }],
    () => request.get(QUERY_PERSONALIZED_NEWSONG.URL, { params: { limit } }),
    {
      enabled: !isLoginByAccount(),
    }
  );
};

export const usePersonalizedSong = (limit?: number) => {
  const [personalizedSongs, setPersonalizedSongs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryPersonalizedSong(limit);

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setPersonalizedSongs(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setPersonalizedSongs, setErrorMsg, toast]);

  return {
    personalizedSongs,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryRecommendSong = () => {
  return useQuery<QueryRecommendSongResponse>(
    [QUERY_RECOMMEND_SONGS.KEY],
    () => request.get(QUERY_RECOMMEND_SONGS.URL),
    {
      enabled: isLoginByAccount(),
    }
  );
};

export const useRecommendSong = () => {
  const [recommendSongs, setRecommendSongs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryRecommendSong();

  useEffect(() => {
    if (data) {
      const { code } = data;
      if (code === 200) {
        const { dailySongs } = data.data;
        setRecommendSongs(dailySongs);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setRecommendSongs, setErrorMsg, toast]);

  return {
    recommendSongs,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQuerySongDetail = (params: QuerySongDetailParams) => {
  return useQuery<QuerySongDetailResponse>(
    [QUERY_SONG_DETAIL.KEY, { params }],
    () => request.get(QUERY_SONG_DETAIL.URL, { params }),
    { enabled: Boolean(params?.id) }
  );
};

export const useSongDetail = (song?: any) => {
  const dispatch = useAppDispatch();
  const br = useAppSelector(selectQuality);

  const { data: resData, ...queryProps } = useQuerySongDetail({
    id: song?.id,
    br,
  });

  const handleSetCurrentSongUrl = () => {
    const newCurrentSong = {
      ...song,
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3&br=${br}`,
    };
    dispatch(setCurrentSong(newCurrentSong));
  };

  useEffect(() => {
    if (resData) {
      const { code, data } = resData;
      if (code === 200) {
        if (data[0].url !== null) {
          dispatch(
            setCurrentSong({
              ...song,
              ...data[0],
            })
          );
        } else {
          handleSetCurrentSongUrl();
        }
      } else {
        handleSetCurrentSongUrl();
      }
    }
  }, [resData]);
};

export const useMutateLikeSong = (params: MutateLikeSongParams) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<MutateLikeSongResponse, AxiosError, MutateLikeSongParams>(
    (params) =>
      request.post(MUTATE_LIKED_LIST.URL, undefined, {
        params: {
          ...params,
          timestamp: new Date().getTime(),
        },
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries([MUTATE_LIKED_LIST.KEY, { ...params }]);
        const { code } = data;
        if (code === 200) {
          dispatch(setRefreshTimestamp());
        }
      },
      onError(error: any, newItem: any, context: any) {
        queryClient.setQueryData(MUTATE_LIKED_LIST.KEY, context.previousItems);

        if (error.message) {
          toast(error.message);
        }
      },
    }
  );
};

export const useQueryLyric = (id?: string | number) => {
  return useQuery<QueryLyricResponse>(
    [QUERY_LYRIC.KEY, { id }],
    () => request.get(QUERY_LYRIC.URL, { params: { id } }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useLyric = (id?: string | number) => {
  const [lyric, setLyric] = useState(null);
  const [tlyric, setTlyric] = useState(null);
  const [lyricWithTrans, setLyricWithTrans] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryLyric(id);

  useEffect(() => {
    if (data) {
      const { code } = data;
      if (code === 200) {
        const { lyric, tlyric } = lyricParser(data);
        setLyric(lyric);
        setTlyric(tlyric);
        setLyricWithTrans(lyricWithTranslation({ lyric, tlyric }));
        // console.log(lyric);
        // console.log(tlyric);
        // console.log(lyricWithTranslation({ lyric, tlyric }));
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setLyric, setTlyric, setLyricWithTrans]);

  return {
    lyric,
    setLyric,
    tlyric,
    setTlyric,
    lyricWithTrans,
    setLyricWithTrans,
    errorMsg,
    data,
    ...queryProps,
  };
};
