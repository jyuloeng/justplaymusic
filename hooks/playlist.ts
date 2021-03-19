import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "../lib/request";
import { toast } from "../lib/toast";
import {
  QUERY_PERSONALIZED_PLAYLIST,
  QUERY_PLAYLIST_DETAIL,
} from "../lib/const";
import { useSong } from "./index";

interface QueryPersonalizedPlaylistResponse {
  code?: number;
  category?: number;
  hasTaste?: boolean;
  result?: unknown[];
}

interface QueryPlaylistDetailResponse {
  code?: number;
  urls?: unknown;
  relatedVideos?: unknown;
  playlist?: any;
  privileges?: any[];
}

export const useQueryPersonalizedPlaylist = (limit?: number) => {
  return useQuery<QueryPersonalizedPlaylistResponse>(
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

export const useQueryPlaylistDetail = (id?: string) => {
  return useQuery<QueryPlaylistDetailResponse>(
    [QUERY_PLAYLIST_DETAIL.KEY, { id }],
    () =>
      request.get(QUERY_PLAYLIST_DETAIL.URL, {
        params: { id, timestamp: new Date().getTime() },
      }),
    {
      enabled: Boolean(id),
    }
  );
};

export const usePlaylistDetail = (id?: string) => {
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [songIds, setSongIds] = useState([]);

  const { data, ...queryProps } = useQueryPlaylistDetail(id);

  const { songs } = useSong(songIds);

  useEffect(() => {
    if (data) {
      const { code, playlist } = data;
      if (code === 200) {
        setPlaylistInfo(playlist);

        const ids = playlist?.trackIds?.map((item) => item.id);
        setSongIds(ids);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setPlaylistInfo, setSongIds, setErrorMsg, toast]);

  useEffect(() => {
    setPlaylistSongs(songs);
  }, [songs]);

  return {
    playlistInfo,
    setPlaylistInfo,
    playlistSongs,
    setPlaylistSongs,
    errorMsg,
    data,
    ...queryProps,
  };
};
