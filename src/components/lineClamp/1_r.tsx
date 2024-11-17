import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";
import { measureLines } from "@/service/utils";

const LineClampedText = ({ text }: { text: string }) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const [isClamped, toggleIsClamped] = useState(true);

  useEffect(() => {
    if (text && elemRef.current) {
      const measuredLines = measureLines(elemRef.current, text);
      toggleIsClamped(measuredLines > 3);
    }
  }, [text]);

  return (
    <div className={cx("content", { clamped: isClamped })}>
      <div
        className={cx("text")}
        ref={elemRef}
        style={{
          WebkitLineClamp: 3,
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
        #1<sub>canvas - 3줄말줄임</sub>
      </h3>
      {data.map((d, i) => (
        <LineClampedText key={i} text={d} />
      ))}
    </>
  );
};

export default LineClamp1;
