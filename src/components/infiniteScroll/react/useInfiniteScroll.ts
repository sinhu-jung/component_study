import { useEffect } from "react";

import { useRef } from "react";
import useInfiniteFetcher from "./useInfiniteFetcher";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const ioOptions = {
  threshold: 0.5,
};

const useInfiniteScroll = () => {
  const { data, fetchNextPage, state } = useInfiniteFetcher();
  const moreRef = useRef<HTMLDivElement>(null);
  const {
    entries: [entry],
  } = useIntersectionObserver(moreRef, ioOptions);
  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return {
    moreRef,
    data,
    state,
  };
};

export default useInfiniteScroll;
