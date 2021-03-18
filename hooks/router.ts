import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";

export const useReady = (callback: (param: NextRouter) => void) => {
  if (typeof callback !== "function") {
    throw new Error("Please use function as callback param!");
  }

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      callback(router);
    }
  }, [router.isReady]);

  return router;
};
