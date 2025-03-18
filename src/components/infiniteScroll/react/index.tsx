import cx from "../cx";
import { Datum } from "./useInfiniteFetcher";
import useInfiniteScroll from "./useInfiniteScroll";

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

const InfiniteScrollR = () => {
  const { data, moreRef, state } = useInfiniteScroll();
  return (
    <>
      <h2>무한스크롤</h2>
      <h3>#1 React - IO</h3>
      <ul>
        {data.map((page, i) =>
          page.map((item, j) => (
            <ListItem key={`${i}-${j}`} {...item} number={i * 20 + j + 1} />
          ))
        )}
      </ul>
      <div ref={moreRef} />
      <div className={cx({ spinner: state === "loading" })} />
    </>
  );
};

export default InfiniteScrollR;
