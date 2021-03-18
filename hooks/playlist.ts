import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "../lib/request";
import { QUERY_PERSONALIZED_PLAYLIST } from "../lib/const";

interface PersonalizedPlaylistResponse {
  code?: number;
  category?: number;
  hasTaste?: boolean;
  result?: unknown[];
}

export const useQueryPersonalizedPlaylist = (limit?: number) => {
  return useQuery<PersonalizedPlaylistResponse>(
    [QUERY_PERSONALIZED_PLAYLIST.KEY, { limit }],
    () =>
      request.get(QUERY_PERSONALIZED_PLAYLIST.URL, {
        params: { limit },
      }),
    {}
  );
};

export const usePersonalizedPlaylist = (limit?: number) => {
  const [personalizedPlaylist, setPersonalizedPlaylist] = useState([]);

  const { data, ...queryProps } = useQueryPersonalizedPlaylist(limit);

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setPersonalizedPlaylist(result);
      }
    }
  }, [data, setPersonalizedPlaylist]);

  return {
    personalizedPlaylist,
    setPersonalizedPlaylist,
    data,
    ...queryProps,
  };
};
