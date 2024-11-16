import { useEffect, useRef } from "react";
import cx from "./cx";
import { measureLines } from "@/service/utils";

const TextBox2 = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textAreaRef.current;
    const handleInput = () => {
      if (!elem) return;
      const val = elem.value;
      const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
      elem.rows = lines;
    };
    if (elem) elem.addEventListener("input", handleInput);
    return () => {
      if (elem) elem.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <>
      <h1>
        #2 <sub>uncontrolled. canvas</sub>
      </h1>
      <div className={cx("container")}>
        <textarea ref={textAreaRef} className={cx("textarea")} rows={3} />
      </div>
    </>
  );
};

export default TextBox2;
