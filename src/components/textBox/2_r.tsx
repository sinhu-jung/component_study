import { useEffect, useRef } from "react";
import cx from "./cx";
import { measureLines } from "@/service/utils";

const TextBox2 = () => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const elem = e.target;
    if (!elem) return;
    const val = elem.value;
    const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
    elem.rows = lines;
  };

  return (
    <>
      <h1>
        #2 <sub>uncontrolled. canvas</sub>
      </h1>
      <div className={cx("container")}>
        <textarea className={cx("textarea")} rows={3} onInput={handleInput} />
      </div>
    </>
  );
};

export default TextBox2;
