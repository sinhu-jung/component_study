import { useEffect, useRef } from "react";
import cx from "./cx";

const TextBox3 = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textAreaRef.current;
    const clone = cloneRef.current;
    const handleInput = () => {
      if (!elem || !clone) return;
      const val = elem.value;
      clone.value = val;
      const lines = Math.min(
        Math.max(Math.ceil(clone.scrollHeight / clone.clientHeight), 3),
        15
      );
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
        #3 <sub>uncontrolled. clone elem</sub>
      </h1>
      <div className={cx("container")}>
        <textarea ref={cloneRef} className={cx("clone")} rows={1} readOnly />
        <textarea ref={textAreaRef} className={cx("textarea")} rows={3} />
      </div>
    </>
  );
};

export default TextBox3;
