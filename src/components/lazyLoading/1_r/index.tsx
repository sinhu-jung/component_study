"use client";

import { useEffect, useRef, useState } from "react";
import cx from "../cx";
import data from "../data";
import useIntersectionOpserver from "@/hooks/useIntersectionObserver";

const ioOptions: IntersectionObserverInit = {
  threshold: 0,
};

const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
  loading: "lazy" | "eager";
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { entries, observerRef } = useIntersectionOpserver(imgRef, ioOptions);

  useEffect(() => {
    if ("loading" in HTMLImageElement.prototype) {
      imgRef.current!.setAttribute("src", src);
      imgRef.current!.setAttribute("loading", "lazy");
      observerRef.current?.disconnect();
      return;
    }

    const isVisible = entries[0]?.isIntersecting;
    if (isVisible) {
      const onLoad = () => {
        setLoaded(true);
      };
      imgRef.current!.addEventListener("load", onLoad, { once: true });
      imgRef.current!.setAttribute("src", src);
      // disconnect 는 ref 전체에 대한 옵저버를 해제하는 것
      // unobserve 는 특정 요소에 대한 옵저버를 해제하는 것
      observerRef.current?.disconnect();
    }
  }, [src, entries]);

  return (
    <img
      ref={imgRef}
      className={cx({ lazy: !loaded })}
      width={width}
      height={height}
      alt=""
      // 브라우저에서 이미지 로딩을 자동으로 처리하는 것
      src={src}
      loading="lazy"
    />
  );
};

const builtInLazySupported =
  typeof window !== "undefined" && "loading" in HTMLImageElement.prototype;
const BuiltInImage = (props: any) => (
  <img {...props} className={cx({ lazy: true })} />
);
const Component = builtInLazySupported ? BuiltInImage : LazyImage;

const LazyLoad1 = () => {
  return (
    <>
      <h2>
        지연로딩<sub>#1</sub>
      </h2>
      {data.map((url, index) => (
        <Component
          key={index}
          src={url}
          width={600}
          height={320}
          loading="lazy"
        />
      ))}
    </>
  );
};

export default LazyLoad1;
