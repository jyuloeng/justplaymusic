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
  result?: any[];
}

interface QueryPlaylistDetailResponse {
  code?: number;
  urls?: unknown;
  relatedVideos?: unknown;
  playlist?: any;
  privileges?: any[];
}
interface QueryPlaylistDetailParams {
  id?: string;
  limit?: number;
}

interface BaseQueryParams {
  limit?: number;
  offset?: number;
}

export const useQueryPersonalizedPlaylist = (params?: BaseQueryParams) => {
  return useQuery<QueryPersonalizedPlaylistResponse>(
    [QUERY_PERSONALIZED_PLAYLIST.KEY, { params }],
    () =>
      request.get(QUERY_PERSONALIZED_PLAYLIST.URL, {
        params,
      }),
    {}
  );
};

export const usePersonalizedPlaylist = (params?: BaseQueryParams) => {
  const [personalizedPlaylist, setPersonalizedPlaylist] = useState([]);

  const { data, ...queryProps } = useQueryPersonalizedPlaylist(params);

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

export const usePlaylistDetail = (params: QueryPlaylistDetailParams) => {
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [trackIds, setTrackIds] = useState([]);
  const [oldLimit, setOldLimit] = useState(0);
  const [songIds, setSongIds] = useState([]);

  const { data, ...queryProps } = useQueryPlaylistDetail(params?.id);

  useEffect(() => {
    if (data) {
      const { code, playlist } = data;
      if (code === 200) {
        setPlaylistInfo(playlist);
        setTrackIds(playlist.trackIds);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setPlaylistInfo, setTrackIds, setErrorMsg, toast]);

  useEffect(() => {
    // if(trackIds.length < params.limit)
    const ids = trackIds?.slice(oldLimit, params.limit)?.map((item) => item.id);
    if (trackIds.length > 0) {
      setOldLimit(params.limit);
      setSongIds(ids);
    }
  }, [trackIds.length, params.limit, setSongIds, setOldLimit]);

  const { songs } = useSong(songIds);

  useEffect(() => {
    setPlaylistSongs((value) => [...value, ...songs]);
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
