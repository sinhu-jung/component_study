import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const SingleOpenContext = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

const SingleOpenContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = useState<string | null>(null);

  return (
    <SingleOpenContext.Provider value={state}>
      {children}
    </SingleOpenContext.Provider>
  );
};

export const useSingleOpen = (id: string) => {
  const [currentId, dispatch] = useContext(SingleOpenContext);

  return [currentId === id, dispatch] as const;
};

export default SingleOpenContextProvider;
