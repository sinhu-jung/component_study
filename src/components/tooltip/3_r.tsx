import { SyntheticEvent, useEffect, useState } from "react";
import cx from "./cx";
import data from "./data";

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <details className={cx("container")} data-tooltip={id}>
      <summary className={cx("summary")} data-tooltip-summary>
        {title}
      </summary>
      <div className={cx("tooltip")} onClick={(e) => e.stopPropagation()}>
        {description}
      </div>
    </details>
  );
};

const Tooltip3 = () => {
  useEffect(() => {
    const closeAllTooltips = (e: Event) => {
      const target = e.target as HTMLElement;

      document.querySelectorAll(`[data-tooltip]`).forEach((el) => {
        if (el !== target.parentElement) {
          el.removeAttribute("open");
        }
      });
    };

    window.addEventListener("click", closeAllTooltips);

    return () => {
      window.removeEventListener("click", closeAllTooltips);
    };
  }, []);

  return (
    <>
      <h3>
        #3. React<sub>html details 태그 사용</sub>
      </h3>
      {data.map((d) => (
        <Tooltip key={d.id} {...d} />
      ))}
    </>
  );
};

export default Tooltip3;
