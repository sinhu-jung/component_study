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

/**
연속하는 두 아코디언 아이템 A, B가 있다고 합시다.
A의 실제 높이는 80px, B의 실제 높이는 100px입니다.
transition을 3초간 주었다고 해보죠. 

max-height를 100px로 특정
각 컨텐츠의 height가 정해져있지 않기 때문에, transition의 판단기준은 100px가 됩니다.
즉 3초간 0px -> 100px 또는 100px -> 0px로 변화할 것입니다.

그렇다면 A는 전부 열리거나 닫히는 데에 3 x 80/100 = 2.4초가 걸릴 것입니다.
나머지 0.6초 동안은 멈춰있게 되겠죠.
(실제로는 easing함수가 적용되기 때문에 완전히 멈춰있지는 않을 것이지만,
여기서는 편의상 이 시간동안의 변화는 무시하고, 멈춰있는 것으로 간주합시다)

열릴때는 먼저 2.4초동안 높이가 변하고, 나머지 0.6초를 대기하는 반면
닫힐때는 0.6초를 대기하다가 이후 2.4초동안 높이가 변할 것입니다.

반면 B는 전부 열리거나 닫히는 데에 3초가 걸립니다.
멈춰있는 시간은 없습니다.

따라서 A가 열려있는 상태에서 B를 클릭하는 동작에 대해
A는 0.6초를 대기하다가 이후부터 닫히는 반면
B는 3초 전체에 걸쳐서 열리게 됩니다.
0.6초는 제법 짧은 시간이라서 부자연스러운 느낌이 그렇게까지 크진 않습니다.

max-height를 200px로 특정 
A는 전부 열리거나 닫히는 데에 3 x 80/200 = 1.2초가 걸립니다.
1.8초 동안은 멈춰있게 됩니다.

반면 B는 전부 열리거나 닫히는 데에 3 x 100/200 = 1.5초가 걸립니다.
1.5초 동안은 멈춰있게 됩니다. 

따라서 A가 열려있는 상태에서 B를 클릭하는 동작에 대해
A는 1.8초를 대기했다가 1.2초만에 닫히는 반면
B는 1.5초동안 열리고, 1.5초 대기합니다.

즉 처음 1.5초 동안은 A는 그대로 있는 상태에서 B만 높아지다가
1.5초 시점부터 1.8초까지는 A와 B 둘 다 아무런 변화가 없이 정지해 있고,
1.8초 이후부터는 B는 그대로 있는 상태에서 A만 줄어들 것입니다.
따라서 '덜컥거리는' 느낌이 강하게 들게 됩니다.

이런 현상은 max-height와 실제 높이의 차이가 클수록 더욱 선명하게 드러나겠네요.
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
