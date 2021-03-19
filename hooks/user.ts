import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "../lib/toast";
import request from "../lib/request";
import Cookies from "js-cookie";
import {
  QUERY_USER_SUBLIST,
  QUERY_USER_PROFILE,
  QUERY_USER_PLAYLIST,
} from "../lib/const";

interface QueryUserSublistResponse {}

interface QueryUserProfileResponse {
  code?: number;
  profile?: object;
  account?: object;
}

interface QueryUserPlaylistResponse {
  code?: number;
  more?: boolean;
  version?: string;
  playlist?: any[];
}

interface QueryUserPlaylistParams {
  uid: string | number;
  limit?: number;
  offset?: number;
}

export const useQueryUserSublist = () => {};

export const useUserSublist = () => {};

export const useQueryUserProfile = (cookie: string) => {
  return useQuery<QueryUserProfileResponse>(
    [QUERY_USER_PROFILE.KEY, { cookie }],
    () =>
      request.get(QUERY_USER_PROFILE.URL, {
        params: { timestamp: new Date().getTime(), cookie },
      }),
    {
      enabled: Boolean(cookie),
    }
  );
};

export const useUserProfile = (cookie: string) => {
  const [userProfile, setUserProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryUserProfile(cookie);

  useEffect(() => {
    if (data) {
      const { code, profile } = data;
      if (code === 200) {
        setUserProfile(profile);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setUserProfile, setErrorMsg, toast]);

  return {
    userProfile,
    setUserProfile,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryUserPlaylist = (params: QueryUserPlaylistParams) => {
  return useQuery<QueryUserPlaylistResponse>(
    [QUERY_USER_PLAYLIST.KEY, { params }],
    () => request.get(QUERY_USER_PLAYLIST.URL, { params }),
    {
      enabled: Boolean(params.uid),
    }
  );
};

export const useUserPlaylist = (params: QueryUserPlaylistParams) => {
  const [
    userPlaylistRes,
    setUserPlaylistRes,
  ] = useState<QueryUserPlaylistResponse>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryUserPlaylist(params);

  useEffect(() => {
    if (data) {
      const { code } = data;
      if (code === 200) {
        setUserPlaylistRes(data);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setUserPlaylistRes, setErrorMsg, toast]);

  return {
    userPlaylistRes,
    setUserPlaylistRes,
    errorMsg,
    data,
    ...queryProps,
  };
};
