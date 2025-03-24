import { Datum } from "@/components/infiniteScroll/react/useInfiniteFetcher";
import cx from "../cx";
import data from "../data";

const ListItem = ({
  id,
  title,
  description,
  number,
}: Datum & { number: number }) => {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
};

const ScrollSpy1 = () => {
  return (
    <div className={cx("ScrollSpy")}>
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>Scroll Spy #1 - IO threshold</h3>
        <ul className={cx("nav")}>
          {data.map(({ index }) => (
            <li className={cx("navItem")} key={index}>
              <button>{index + 1}</button>
            </li>
          ))}
        </ul>
      </header>
      <ul>
        {data.map((item) => (
          <ListItem key={item.id} {...item} number={item.index + 1} />
        ))}
      </ul>
    </div>
  );
};

export default ScrollSpy1;
