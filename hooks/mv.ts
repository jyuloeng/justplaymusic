import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "../lib/toast";
import request from "../lib/request";
import {
  QUERY_MV_DETAIL,
  QUERY_MV_URL,
  QUERY_PERSONALIZED_MV,
  QUERY_VIDEO_DETAIL,
  QUERY_VIDEO_URL,
} from "../lib/const";

interface QueryPersonalizedMVResponse {
  code?: number;
  category?: number;
  result?: any[];
}

interface QueryMVorVideoDetailResponse {
  code?: number;
  data?: any;
}

interface QueryMVorVideoUrlParams {
  id?: string | number;
  r?: number;
}

interface QueryMVorVideoUrlResponse {
  code?: number;
  data?: any;
  urls?: any;
}

export const useQueryPersonalizedMV = (limit?: number) => {
  return useQuery<QueryPersonalizedMVResponse>(
    [QUERY_PERSONALIZED_MV.KEY, { limit }],
    () => request.get(QUERY_PERSONALIZED_MV.URL, { params: { limit } }),
    {}
  );
};

export const usePersonalizedMV = (limit?: number) => {
  const [personalizedMV, setPersonalizedMV] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryPersonalizedMV(limit);

  useEffect(() => {
    if (data) {
      const { code, result } = data;
      if (code === 200) {
        setPersonalizedMV(result);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setPersonalizedMV, setErrorMsg, toast]);

  return {
    personalizedMV,
    setPersonalizedMV,
    errorMsg,
    data,
    ...queryProps,
  };
};

export const useQueryMVorVideoDetail = (id?: number | string) => {
  const isQueryMV = Boolean(Number(id));
  const key = isQueryMV ? QUERY_MV_DETAIL.KEY : QUERY_VIDEO_DETAIL.KEY;
  const url = isQueryMV ? QUERY_MV_DETAIL.URL : QUERY_VIDEO_DETAIL.URL;
  let params = {};
  isQueryMV ? (params["mvid"] = id) : (params["id"] = id);

  return useQuery<QueryMVorVideoDetailResponse>(
    [key, { id }],
    () => request.get(url, { params }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useMVorVideoDetail = (id?: number | string) => {
  const isQueryMV = Boolean(Number(id));
  const [mvInfo, setMVInfo] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data: resData, ...queryProps } = useQueryMVorVideoDetail(id);

  useEffect(() => {
    if (resData) {
      const { code, data } = resData;

      if (code === 200) {
        if (isQueryMV) {
          setMVInfo(data);
        } else {
          setVideoInfo(data);
        }
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [resData, setMVInfo, setVideoInfo, setErrorMsg, toast]);

  return {
    mvInfo,
    setMVInfo,
    videoInfo,
    setVideoInfo,
    errorMsg,
    setErrorMsg,
    resData,
    ...queryProps,
  };
};

export const useQueryMVorVideoUrl = (params?: QueryMVorVideoUrlParams) => {
  const isQueryMV = Boolean(Number(params?.id));
  const key = isQueryMV ? QUERY_MV_URL.KEY : QUERY_VIDEO_URL.KEY;
  const url = isQueryMV ? QUERY_MV_URL.URL : QUERY_VIDEO_URL.URL;

  return useQuery<QueryMVorVideoUrlResponse>(
    [key, { params }],
    () => request.get(url, { params }),
    {
      enabled: Boolean(params?.id),
    }
  );
};

export const useMVorVideoUrl = (params?: QueryMVorVideoUrlParams) => {
  const isQueryMV = Boolean(Number(params?.id));
  const [url, setUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const { data: resData, ...queryProps } = useQueryMVorVideoUrl(params);

  useEffect(() => {
    if (resData) {
      const { code, urls, data } = resData;
      if (code === 200) {
        isQueryMV
          ? setUrl(data?.url)
          : setUrl(
              urls[urls?.findIndex((item) => item.r === params.r)]?.url ||
                urls[0]?.url
            );
      } else {
        setErrorMsg(resData);
        toast(`🦄 ${resData}`);
      }
    }
  }, [resData, setErrorMsg, toast]);

  return {
    url,
    setUrl,
    errorMsg,
    setErrorMsg,
    resData,
    ...queryProps,
  };
};
