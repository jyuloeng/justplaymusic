import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "../lib/toast";
import request from "../lib/request";
import { QUERY_PERSONALIZED_MV } from "../lib/const";

interface QueryPersonalizedMVResponse {
  code?: number;
  category?: number;
  result?: any[];
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
