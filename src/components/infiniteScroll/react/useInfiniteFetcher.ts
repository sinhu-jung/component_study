import { pickRandom, randomize, waitFor } from "@/service/utils";
import data from "../data";
import { useCallback, useState } from "react";

export type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export type FetchState<T> = {
  data: T[][];
  state: "loading" | "fetched" | "idle" | "error";
};

const generatePageData = async () => {
  await waitFor(randomize({ min: 300, max: 1500, step: 50 }));
  return pickRandom({ data, length: 20 });
};

const useInfiniteFetcher = () => {
  const [state, setState] = useState<FetchState<Datum>>({
    data: [],
    state: "idle",
  });

  const fetchNextPage = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      state: "loading",
    }));

    // await 데이터 생성
    const pageData = await generatePageData();

    setState((prev) => {
      const nextData = [...(prev.data || []), pageData];
      return {
        data: nextData,
        state: "fetched",
      };
    });
  }, []);

  return {
    fetchNextPage,
    ...state,
  };
};

export default useInfiniteFetcher;
