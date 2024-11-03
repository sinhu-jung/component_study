import {
  createContext,
  ReactNode,
  useContext,
  useSyncExternalStore,
} from "react";

type Rect = Pick<DOMRect, "left" | "top" | "width" | "height"> & {
  scrollHeight: number;
};

const DefaultRect: Rect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = [
  "left",
  "top",
  "width",
  "height",
  "scrollHeight",
];
const isSameRect = (prev: Rect, next: Rect) => {
  return rectKeys.every((key) => prev?.[key] === next?.[key]);
};

const getViewportRect = () => {
  let stored: Rect = DefaultRect;
  return () => {
    const elem = typeof document !== "undefined" && document.scrollingElement;
    if (!elem) return stored;

    const { left, top, width, height } = elem.getBoundingClientRect();
    const newRect = {
      left,
      top,
      width,
      height,
      scrollHeight: elem.scrollHeight,
    };
    if (newRect && !isSameRect(stored, newRect)) {
      stored = newRect;
    }
    return stored;
  };
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  window.addEventListener("scroll", callback);
  resizeObserver.observe(document.body);
  return () => {
    window.removeEventListener("scroll", callback);
    resizeObserver.disconnect();
  };
};

const ViewportContext = createContext<Rect>(DefaultRect);

const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
  const viewportRect = useSyncExternalStore(subscribe, getViewportRect());

  return (
    <ViewportContext.Provider value={viewportRect}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportContextProvider;

export const useViewportRect = () => useContext(ViewportContext);
