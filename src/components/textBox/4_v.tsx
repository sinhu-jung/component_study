import { measureLines } from "@/service/utils";
import VanillaWrapper from "../vanillaWrapper";
import cx from "./cx";

const initiator = (wrapper: HTMLElement) => {
  const $textarea = document.createElement("textarea");
  $textarea.classList.add(cx("textarea"));
  $textarea.rows = 3;

  const handleInput = () => {
    const val = $textarea.value;
    const lines = Math.min(Math.max(measureLines($textarea, val), 3), 15);
    $textarea.rows = lines;
  };
  $textarea.addEventListener("input", handleInput);

  const $cont = document.createElement("div");
  $cont.classList.add(cx("container"));
  $cont.append($textarea);

  wrapper.append($cont);
};

const TextBox4V = () => <VanillaWrapper title="#4" initiator={initiator} />;

export default TextBox4V;
