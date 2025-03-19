import vanillaIntersectionObserver from "@/hooks/vanilla/vanillaIntersectionObserver";

const lazyLoad = ($elem: HTMLImageElement, src: string) => {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("src", src);
        observer?.disconnect();
      }
    });
  };

  const observer = vanillaIntersectionObserver(
    $elem,
    {
      threshold: 0,
    },
    handleIntersect
  );

  return observer;
};

export default lazyLoad;
