import { LazyImage } from "@/components/lazyLoading/1_r";
import cx from "../cx";
import data from "../data";
import { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserverV2";

type Direction = "prev" | "next";
type ItemElemType = HTMLLIElement | null;
const DefaultButtonState = {
  prev: true,
  next: true,
};
const Item = ({
  id,
  description,
  imgUrl,
}: {
  id: string;
  description: string;
  imgUrl: string;
}) => (
  <div>
    <LazyImage src={imgUrl} width={250} height={400} />
    <span>{description}</span>
  </div>
);

const getVisibleEdgeItems = (
  $list: HTMLUListElement,
  $items: ItemElemType[]
) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect();
  const isVisible = (item: ItemElemType) => {
    const { left, right } = item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    };
    // 전부 화면상에 존재하는 조건: left > lLeft && right < lRight
    // 애매하게 걸친 경우까지 인정하는 조건: left < lRight && right > lLeft
    return left < lRight && right > lLeft;
  };
  const leftIndex = Math.max($items.findIndex(isVisible), 0);
  const rightIndex = Math.min(
    $items.findLastIndex(isVisible),
    $items.length - 1
  );
  return { left: $items[leftIndex], right: $items[rightIndex] };
};

const ScrollBox = () => {
  const [buttonEnabled, setButtonEnabled] = useState<{
    prev: boolean;
    next: boolean;
  }>(DefaultButtonState);
  const watcherRef = useRef<ItemElemType[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<ItemElemType[]>([]);
  const { entries: watcherEntries } = useIntersectionObserver(watcherRef);
  const move = useCallback(
    (direction: Direction) => () => {
      // ul의 scrollLeft값을 direction에 따라서 prev 일때는 -scrollWidth / next 일때는 +scrollWidth
      // 위 방식으로는 전부 보여지지 않는 항목이 중간중간 동작할 수 밖에 없음
      // 전부 보여지지 않은 아이템을 찾아서, 개를 기준으로 스크롤 이동.
      // const elem: HTMLElement = document.createElement("div");
      // elem.scrollIntoView({
      //   inline: "start", // 가로 위치 'start | center | end | nearest'
      //   block: "nearest", // 세로 위치 'start | center | end | nearest'
      //   behavior: "smooth", // 애니메이션 효과 smooth 0 / instant X / auto 알아서
      // });
      if (!listRef.current || !itemsRef.current.length) return;
      const { left, right } = getVisibleEdgeItems(
        listRef.current,
        itemsRef.current
      );
      const elem = direction === "prev" ? left : right;
      elem?.scrollIntoView({
        inline: direction === "prev" ? "end" : "start",
        block: "nearest",
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    if (!watcherEntries.length) setButtonEnabled(DefaultButtonState);
    setButtonEnabled((prev) => {
      const newState = { ...DefaultButtonState };
      watcherEntries.forEach((e) => {
        const direction = (e.target as HTMLElement).dataset
          .direction as Direction;
        newState[direction] = false;
      });
      return newState;
    });
  }, [watcherEntries]);

  return (
    <div className={cx("scrollBox")}>
      <ul className={cx("list")} ref={listRef}>
        <li
          className={cx("observer")}
          ref={(r) => (watcherRef.current[0] = r)}
          data-direction="prev"
        />
        {data.map((item, i) => (
          <li
            key={item.id}
            className={cx("item")}
            ref={(r) => (itemsRef.current[i] = r)}
          >
            <Item {...item} />
          </li>
        ))}
        <li
          className={cx("observer")}
          ref={(r) => (watcherRef.current[1] = r)}
          data-direction="next"
        />
      </ul>
      <button
        className={cx("nav-button", "prev", { on: buttonEnabled.prev })}
        onClick={move("prev")}
      ></button>
      <button
        className={cx("nav-button", "next", { on: buttonEnabled.next })}
        onClick={move("next")}
      ></button>
    </div>
  );
};

export default ScrollBox;
