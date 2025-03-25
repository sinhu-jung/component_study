import Accordions from "./components/accordion";
import InfiniteScrollR from "./components/infiniteScroll/react";
import InfiniteScrollV from "./components/infiniteScroll/vanilla";
import LazyLoad1 from "./components/lazyLoading/1_r";
import LazyLoading_V from "./components/lazyLoading/1_v";
import LineClamps from "./components/lineClamp";
import ScrollBox from "./components/scrollBox";
import ScrollSpy1 from "./components/scrollSpy/react/1_r";
import ScrollSpy2 from "./components/scrollSpy/react/2_r";
import ScrollSpy3V from "./components/scrollSpy/vanilla/3_v";
import TabMenus from "./components/tabMenu";
import TextBoxes from "./components/textBox";
import Tooltip from "./components/tooltip";

export const routePaths = [
  "/",
  "/accordion",
  "/tabMenu",
  "/tooltip",
  "/textBox",
  "/lineClamp",
  "/lazyLoading",
  "/infiniteScroll",
  "/scrollBox",
  "/scrollSpy",
  "/snackbar",
  "/modal",
  "/popover",
  "/imageSlide",
  "/carousel",
  "/gallery",
  "/selectBox",
  "/autoComplete",
  "/dnd",
  "/lazyLoading/1_r",
  "/lazyLoading/1_v",
  "/infiniteScroll/react",
  "/infiniteScroll/vanilla",
  "/scrollSpy/1_r",
  "/scrollSpy/2_r",
  "/scrollSpy/3_v",
] as const;
export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};
export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};
export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};
export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
  "/": {
    key: "/",
    link: "/",
    name: "root",
    children: [
      "/accordion",
      "/tabMenu",
      "/tooltip",
      "/textBox",
      "/lineClamp",
      "/lazyLoading",
      "/infiniteScroll",
      "/scrollBox",
      "/scrollSpy",
      "/snackbar",
      "/modal",
      "/popover",
      "/imageSlide",
      "/carousel",
      "/gallery",
      "/selectBox",
      "/autoComplete",
      "/dnd",
    ],
  },
  "/accordion": {
    key: "/accordion",
    link: "/accordion",
    name: "01. 아코디언",
    children: Accordions,
  },
  "/tabMenu": {
    key: "/tabMenu",
    link: "/tabMenu",
    name: "02. 탭메뉴",
    children: TabMenus,
  },
  "/tooltip": {
    key: "/tooltip",
    link: "/tooltip",
    name: "03. 툴팁",
    children: Tooltip,
  },
  "/textBox": {
    key: "/textBox",
    link: "/textBox",
    name: "04. 반응형 텍스트박스",
    children: TextBoxes,
  },
  "/lineClamp": {
    key: "/lineClamp",
    link: "/lineClamp",
    name: "05. 여러줄 말줄임",
    children: LineClamps,
  },
  "/lazyLoading": {
    key: "/lazyLoading",
    link: "/lazyLoading/1_r",
    name: "06. 지연 로딩",
    children: ["/lazyLoading/1_r", "/lazyLoading/1_v"],
  },
  "/lazyLoading/1_r": {
    key: "/lazyLoading/1_r",
    link: "/lazyLoading/1_r",
    name: "#1 React",
    children: LazyLoad1,
  },
  "/lazyLoading/1_v": {
    key: "/lazyLoading/1_v",
    link: "/lazyLoading/1_v",
    name: "#1 Vanilla",
    children: LazyLoading_V,
  },
  "/infiniteScroll": {
    key: "/infiniteScroll",
    link: "/infiniteScroll/react",
    name: "07. 무한 스크롤",
    children: ["/infiniteScroll/react", "/infiniteScroll/vanilla"],
  },
  "/infiniteScroll/react": {
    key: "/infiniteScroll/react",
    link: "/infiniteScroll/react",
    name: "#1 React",
    children: InfiniteScrollR,
  },
  "/infiniteScroll/vanilla": {
    key: "/infiniteScroll/vanilla",
    link: "/infiniteScroll/vanilla",
    name: "#2 Vanilla",
    children: InfiniteScrollV,
  },
  "/scrollBox": {
    key: "/scrollBox",
    link: "/scrollBox",
    name: "08. 횡 스크롤 박스",
    children: ScrollBox,
  },
  "/scrollSpy": {
    key: "/scrollSpy",
    link: "/scrollSpy/1_r",
    name: "09. 스크롤 스파이",
    children: ["/scrollSpy/1_r", "/scrollSpy/2_r", "/scrollSpy/3_v"],
  },
  "/scrollSpy/1_r": {
    key: "/scrollSpy/1_r",
    link: "/scrollSpy/1_r",
    name: "#1 React",
    children: ScrollSpy1,
  },
  "/scrollSpy/2_r": {
    key: "/scrollSpy/2_r",
    link: "/scrollSpy/2_r",
    name: "#2 React",
    children: ScrollSpy2,
  },
  "/scrollSpy/3_v": {
    key: "/scrollSpy/3_v",
    link: "/scrollSpy/3_v",
    name: "#3 Vanilla",
    children: ScrollSpy3V,
  },
  "/snackbar": {
    key: "/snackbar",
    link: "/snackbar",
    name: "10. 스낵바",
    children: null,
  },
  "/modal": {
    key: "/modal",
    link: "/modal",
    name: "11. 모달",
    children: null,
  },
  "/popover": {
    key: "/popover",
    link: "/popover",
    name: "12. 팝오버",
    children: null,
  },
  "/imageSlide": {
    key: "/imageSlide",
    link: "/imageSlide",
    name: "13. 이미지 슬라이드",
    children: null,
  },
  "/carousel": {
    key: "/carousel",
    link: "/carousel",
    name: "14. 캐러셀",
    children: null,
  },
  "/gallery": {
    key: "/gallery",
    link: "/gallery",
    name: "15. 갤러리",
    children: null,
  },
  "/selectBox": {
    key: "/selectBox",
    link: "/selectBox",
    name: "16. 셀렉트 박스",
    children: null,
  },
  "/autoComplete": {
    key: "/autoComplete",
    link: "/autoComplete",
    name: "17. 자동 완성",
    children: null,
  },
  "/dnd": {
    key: "/dnd",
    link: "/dnd",
    name: "18. D&D 리스트",
    children: null,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes["/"] as ParentRoute).children.map(
  (r) => routes[r]
);
