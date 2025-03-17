import { useEffect, useRef, useState } from "react";

type Elem = Element | null;
const useIntersectionOpserver = (
  elemRef: React.RefObject<Elem>,
  options: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver>();
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const node = elemRef.current;

    if (!node) return;
    observerRef.current = new IntersectionObserver(setEntries, options);
    observerRef.current.observe(elemRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [elemRef, options]);

  return { entries, observerRef };
};

export default useIntersectionOpserver;
