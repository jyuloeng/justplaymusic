import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { AxiosError } from "axios";
import { toast } from "../lib/toast";
import request from "../lib/request";
import Cookies from "js-cookie";
import {
  QUERY_USER_SUBLIST,
  QUERY_USER_PROFILE,
  QUERY_USER_PLAYLIST,
  MUTATE_USER_LOGIN_BY_EMAIL,
  MUTATE_USER_LOGIN_BY_PHONE,
  MUTATE_USER_LOGOUT,
  QUERY_USER_DETAIL,
} from "../lib/const";

interface QueryUserSublistResponse {
  code?: number;
  count?: number;
  data?: any[];
  hasMore?: boolean;
  paidCount?: number;
}

interface QueryUserSublistParams {
  key?: string;
  limit?: number;
  offset?: number;
}

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

export interface MutateUserLoginResponse {
  code: number;
  msg?: string;
  message?: string;
  account?: object;
  bindings?: object;
  cookie?: string;
  loginType?: number;
  profile?: object;
  token?: string;
}

interface MutateUserLoginByPhoneParams {
  countrycode?: number;
  phone: string;
  password: string;
  md5_password: string;
}

interface MutateUserLoginByEmailParams {
  email: string;
  password: string;
  md5_password: string;
}

export const useQueryUserSublist = (params: QueryUserSublistParams) => {
  return useQuery<QueryUserSublistResponse>(
    [QUERY_USER_SUBLIST.KEY, { params }],
    () =>
      request.get(QUERY_USER_SUBLIST.URL.replace(/:key/, params.key), {
        params,
      }),
    {
      enabled: Boolean(params.key),
    }
  );
};

export const useUserSublist = (params: QueryUserSublistParams) => {
  const [
    likedAlbumsRes,
    setLikedAlbumsRes,
  ] = useState<QueryUserSublistResponse>(null);
  const [
    likedArtistsRes,
    setLikedArtistsRes,
  ] = useState<QueryUserSublistResponse>(null);
  const [likedMvsRes, setLikedMvsRes] = useState<QueryUserSublistResponse>(
    null
  );

  const { data, ...queryProps } = useQueryUserSublist(params);

  useEffect(() => {
    if (data) {
      const { key } = params;
      const { code } = data;
      if (code === 200) {
        if (key === "album") {
          setLikedAlbumsRes(data);
        } else if (key === "artist") {
          setLikedArtistsRes(data);
        } else if (key === "mv") {
          setLikedMvsRes(data);
        }
      }
    }
  }, [data, setLikedAlbumsRes, setLikedArtistsRes, setLikedMvsRes]);

  return {
    likedAlbumsRes,
    setLikedAlbumsRes,
    likedArtistsRes,
    setLikedArtistsRes,
    likedMvsRes,
    setLikedMvsRes,
    data,
    ...queryProps,
  };
};

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

export const useQueryUserDetail = (uid: number) => {
  return useQuery(
    [QUERY_USER_DETAIL.KEY, { uid }],
    () => request.get(QUERY_USER_DETAIL.URL, { params: { uid } }),
    {
      enabled: Boolean(uid),
    }
  );
};

export const useUserDetail = (uid: number) => {
  return useQueryUserDetail(uid);
};

const useMutateUserLoginConfig = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return {
    onSuccess(data) {
      queryClient.invalidateQueries(queryKey);
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);

      if (error.message) {
        toast(error.message);
      }
    },
  };
};

export const useMutateUserLoginByPhone = () => {
  return useMutation<
    MutateUserLoginResponse,
    AxiosError,
    MutateUserLoginByPhoneParams
  >(
    (params) =>
      request.post(MUTATE_USER_LOGIN_BY_PHONE.URL, undefined, {
        params,
      }),
    useMutateUserLoginConfig(MUTATE_USER_LOGIN_BY_PHONE.KEY)
  );
};

export const useMutateUserLoginByEmail = () => {
  return useMutation<
    MutateUserLoginResponse,
    AxiosError,
    MutateUserLoginByEmailParams
  >(
    (params) =>
      request.post(MUTATE_USER_LOGIN_BY_EMAIL.URL, undefined, {
        params,
      }),
    useMutateUserLoginConfig(MUTATE_USER_LOGIN_BY_EMAIL.KEY)
  );
};

export const useMutateUserLogout = () => {
  return useMutation(
    () => request.post(MUTATE_USER_LOGOUT.URL, undefined, {}),
    useMutateUserLoginConfig(MUTATE_USER_LOGOUT.KEY)
  );
};
