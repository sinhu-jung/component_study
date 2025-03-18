const vanillaIntersectionObserver = (
  $elem: HTMLElement,
  options: IntersectionObserverInit,
  callback: (entry: IntersectionObserverEntry[]) => void
) => {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!$elem) return;
    callback(entries);
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe($elem);

  return observer;
};

export default vanillaIntersectionObserver;
