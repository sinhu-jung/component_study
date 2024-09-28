import { useState } from "react";
import cx from "./cx";
import data from "./data";

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li className={cx("item", "item3", { current })} key={id}>
      <div className={cx("tab")} onClick={toggle}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

/**
 * transition 을 넣어 애니메이션은 동작 하지만 자연스럽지 않다.
 * 밑에 열고 있는 것이 밀고 올라오는 속도와 위에서 닫히고 있는것이 닫히는 속도가
 * 같아야 하는데 css에는 max-height로만 설정 했다. 100vh가 넘으면 닫히는 속도가 일정하지만
 * 넘지 않는 경우에는 animation에 의해 최종 종착지로 인식하는 높이를 최댓값으로 인식한 상태로
 * animation을 동작하다 보니 속도가 안 맞는 것이다.
 * css의 한계 => 방법은 처음부터 높이를 측정하여 해당 높이로 설정하면 해결 된다.
 * 하지만 브라우저 창의 크기 등 여러 고려 요소가 많아 많들기 쉽지 않다.
 */
const Accordion3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #3.React<sub>css animation (transition)</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map((d) => (
          <AccordionItem
            key={d.id}
            {...d}
            current={currentId === d.id}
            toggle={toggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion3;
