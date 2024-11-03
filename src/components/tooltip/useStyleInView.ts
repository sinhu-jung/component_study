import { useViewportRect } from "@/context/ViewportContext";
import { RefObject, useLayoutEffect, useState } from "react";

type PositionKey = "top" | "bottom" | "left" | "right";
export type Position = Partial<Record<PositionKey, number | string>>;
type Style = Partial<Record<"top" | "bottom" | "left" | "right", number>>;

const useStyleInView = (
  wrapperRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  positon: Position
) => {
  const viewportRect = useViewportRect();
  const [style, setStyle] = useState<Style>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? "top"
        : "bottom";
    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? "left"
        : "right";
    setStyle({
      [verticalKey]: positon[verticalKey],
      [verticalKey === "top" ? "bottom" : "top"]: "auto",
      [horizontalKey]: positon[horizontalKey],
      [horizontalKey === "left" ? "right" : "left"]: "auto",
    });
  }, [viewportRect, wrapperRef, targetRef, positon]);

  return style;
};

export default useStyleInView;
