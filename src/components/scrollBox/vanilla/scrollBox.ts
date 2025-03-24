import data from "../data";
import cx from "../cx";
import { lazyImageBuilder } from "@/components/lazyLoading/1_v";
import vanillaIntersectionObserverV2 from "@/hooks/vanilla/intersectionObserverV2";

type ItemElemType = HTMLLIElement | null;
type Direction = "prev" | "next";
type ButtonState = Record<Direction, boolean>;

const DefaultButtonState = { prev: true, next: true };

const generateListItem = ({
  id,
  description,
  imgUrl,
}: {
  id: string;
  description: string;
  imgUrl: string;
}) => {
  const $div = document.createElement("div");
  const $lazyImage = lazyImageBuilder(imgUrl, 250, 400);
  const $span = document.createElement("span");
  $span.textContent = description;

  $div.append($lazyImage, $span);

  return $div;
};

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

const vanillaScrollBox = () => {
  const setButtonEnabled = (state: ButtonState) => {
    $prevBtn.classList.toggle(cx("on"), state.prev);
    $nextBtn.classList.toggle(cx("on"), state.next);
  };

  const move = (direction: Direction) => () => {
    const { left, right } = getVisibleEdgeItems($list, $items);
    const elem = direction === "prev" ? left : right;
    elem?.scrollIntoView({
      inline: direction === "prev" ? "end" : "start",
      block: "nearest",
      behavior: "smooth",
    });
  };

  const $list = document.createElement("ul");
  $list.classList.add(cx("list"));

  const $prevObserver = document.createElement("li");
  const $nextObserver = document.createElement("li");

  $prevObserver.classList.add(cx("observer"));
  $prevObserver.setAttribute("data-direction", "prev");

  $nextObserver.classList.add(cx("observer"));
  $nextObserver.setAttribute("data-direction", "next");

  const $items = data.map((item, i) => {
    const $item = document.createElement("li");
    $item.classList.add(cx("item"));
    $item.append(generateListItem(item));
    return $item;
  });
  $list.append($prevObserver, ...$items, $nextObserver);

  const $prevBtn = document.createElement("button");
  $prevBtn.classList.add(cx("nav-button"), cx("prev"));
  $prevBtn.addEventListener("click", move("prev"));

  const $nextBtn = document.createElement("button");
  $nextBtn.classList.add(cx("nav-button"), cx("next"));
  $nextBtn.addEventListener("click", move("next"));

  const $container = document.createElement("div");
  $container.classList.add(cx("scrollBox"));
  $container.append($list, $prevBtn, $nextBtn);

  vanillaIntersectionObserverV2(
    [$prevObserver, $nextObserver],
    {},
    (entries) => {
      if (!entries.length) setButtonEnabled(DefaultButtonState);
      const newState = { ...DefaultButtonState };
      entries.forEach((e) => {
        const direction = (e.target as HTMLElement).dataset
          .direction as Direction;
        newState[direction] = false;
      });
      setButtonEnabled(newState);
    }
  );

  return $container;
};

export default vanillaScrollBox;
