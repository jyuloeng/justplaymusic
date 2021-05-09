import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "../lib/request";
import { toast } from "../lib/toast";
import {
  MUTATE_LIKED_LIST,
  QUERY_PERSONALIZED_PLAYLIST,
  QUERY_PLAYLIST_DETAIL,
  QUERY_TOP_PLAYLIST,
} from "../lib/const";
import { useSong } from "./index";
import { isTrackPlayable } from "../lib/util";

interface QueryPersonalizedPlaylistResponse {
  code?: number;
  category?: number;
  hasTaste?: boolean;
  result?: any[];
}

interface QueryTopPlaylistResponse {
  code?: number;
  cat?: string;
  more?: boolean;
  playlists?: any[];
  total?: number;
}

interface QueryPlaylistDetailResponse {
  code?: number;
  urls?: unknown;
  relatedVideos?: unknown;
  playlist?: any;
  privileges?: any[];
}

interface QueryPlaylistDetailParams {
  id?: string | number;
  limit?: number;
  refreshTimestamp?: number;
}

interface BaseQueryParams {
  limit?: number;
  offset?: number;
}

interface QueryTopPlaylistParams extends BaseQueryParams {
  order?: string;
  cat?: string;
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
        const formatSongs = result.map((song) => {
          return {
            ...song,
            ...isTrackPlayable(song),
          };
        });

        setPersonalizedPlaylist(formatSongs);
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

export const useQueryTopPlaylist = (params?: QueryTopPlaylistParams) => {
  return useQuery<QueryTopPlaylistResponse>(
    [QUERY_TOP_PLAYLIST.KEY, { params }],
    () =>
      request.get(QUERY_TOP_PLAYLIST.URL, {
        params,
      }),
    {
      enabled: Boolean(params.cat),
    }
  );
};

export const useTopPlaylist = (params?: QueryTopPlaylistParams) => {
  const [playlists, setPlaylists] = useState([]);

  const { data, ...queryProps } = useQueryTopPlaylist(params);

  useEffect(() => {
    if (data) {
      const { code } = data;
      if (code === 200) {
        setPlaylists(data.playlists);
      }
    }
  }, [data, setPlaylists]);

  return {
    playlists,
    setPlaylists,
    data,
    ...queryProps,
  };
};

export const useQueryPlaylistDetail = (params: QueryPlaylistDetailParams) => {
  return useQuery<QueryPlaylistDetailResponse>(
    [
      QUERY_PLAYLIST_DETAIL.KEY,
      { id: params?.id, refreshTimestamp: params?.refreshTimestamp },
    ],
    () =>
      request.get(QUERY_PLAYLIST_DETAIL.URL, {
        params: { id: params?.id, timestamp: new Date().getTime() },
      }),
    {
      enabled: Boolean(params?.id),
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

  const { data, ...queryProps } = useQueryPlaylistDetail(params);

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

  const { songs, isLoading: isPlaylistSongsLoading } = useSong(songIds);

  useEffect(() => {
    const formatSongs = songs.map((song) => {
      return {
        ...song,
        ...isTrackPlayable(song),
      };
    });

    setPlaylistSongs((value) => [...value, ...formatSongs]);
  }, [songs, setPlaylistSongs]);

  return {
    playlistInfo,
    setPlaylistInfo,
    playlistSongs,
    setPlaylistSongs,
    isPlaylistSongsLoading,
    errorMsg,
    data,
    ...queryProps,
  };
};
