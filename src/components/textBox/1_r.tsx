import { useState } from "react";
import cx from "./cx";
import { measureLines } from "@/service/utils";

const TextBox1 = () => {
  const [lines, setLines] = useState(3);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const lines = Math.min(Math.max(measureLines(e.target, val), 3), 15);
    setLines(lines);
  };

  return (
    <>
      <h1>
        #1 <sub>controlled. canvas</sub>
      </h1>
      <div className={cx("container")}>
        <textarea
          className={cx("textarea")}
          onChange={handleChange}
          rows={lines}
        />
      </div>
    </>
  );
};

export default TextBox1;
