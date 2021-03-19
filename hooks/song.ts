import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "./../lib/request";
import { toast } from "../lib/toast";
import { QUERY_SONG, QUERY_PERSONALIZED_NEWSONG } from "../lib/const";

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
    {}
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
