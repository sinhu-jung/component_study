import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";

const LineClampedText = ({ text, lines }: { text: string; lines: number }) => {
  const cloneRef = useRef<HTMLDivElement>(null);
  const elemRef = useRef<HTMLDivElement>(null);
  const [isClamped, toggleIsClamped] = useState(true);

  useEffect(() => {
    if (text && elemRef.current && cloneRef.current) {
      toggleIsClamped(
        Math.floor(
          (cloneRef.current.offsetHeight - 20) /
            parseInt(getComputedStyle(elemRef.current).lineHeight)
        ) > 3
      );
    }
  }, [text]);

  return (
    <div className={cx("content", { clamped: isClamped })}>
      <div className={cx("text-clone")} ref={cloneRef}>
        {text}
      </div>
      <div
        className={cx("text")}
        ref={elemRef}
        style={{
          WebkitLineClamp: lines,
        }}
      >
        {text}
      </div>
      {isClamped && (
        <button
          className={cx("buttonMore")}
          onClick={() => toggleIsClamped(false)}
        />
      )}
    </div>
  );
};

const LineClamp1 = () => {
  return (
    <>
      <h3>
        #2<sub>clone - 3줄말줄임</sub>
      </h3>
      {data.map((d, i) => (
        <LineClampedText key={i} text={d} lines={5 - i} />
      ))}
    </>
  );
};

export default LineClamp1;
