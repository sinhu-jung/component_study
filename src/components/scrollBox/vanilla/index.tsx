import VanillaWrapper from "@/components/vanillaWrapper";
import vanillaScrollBox from "./scrollBox";

const initiator = (wrapper: HTMLDivElement) => {
  const $scrollBox = vanillaScrollBox();
  wrapper.append($scrollBox);
};

const ScrollBox_Vanilla = () => (
  <VanillaWrapper title="ScrollBox" initiator={initiator} />
);

export default ScrollBox_Vanilla;
