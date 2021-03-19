import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "./../lib/request";
import { toast } from "../lib/toast";
import { QUERY_TOPLIST } from "../lib/const";

interface QueryToplistResponse {
  code?: number;
  list?: any[];
  artistToplist?: any[];
}

export const useQueryToplist = () => {
  return useQuery<QueryToplistResponse>(
    [QUERY_TOPLIST.KEY],
    () => request.get(QUERY_TOPLIST.URL),
    {}
  );
};

export const useToplist = () => {
  const [globalRankList, setGlobalRankList] = useState([]);
  const [officialRankList, setOfficialRankList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const { data, ...queryProps } = useQueryToplist();

  useEffect(() => {
    if (data) {
      const { code, list } = data;
      if (code === 200) {
        const gList = [];
        const oList = [];
        list.forEach((item) => {
          if (item.ToplistType) {
            oList.push(item);
          } else {
            gList.push(item);
          }
        });
        setGlobalRankList(gList);
        setOfficialRankList(oList);
      } else {
        setErrorMsg(data);
        toast(`🦄 ${data}`);
      }
    }
  }, [data, setGlobalRankList, setOfficialRankList, setErrorMsg, toast]);

  return {
    globalRankList,
    setGlobalRankList,
    officialRankList,
    setOfficialRankList,
    errorMsg,
    data,
    ...queryProps,
  };
};
