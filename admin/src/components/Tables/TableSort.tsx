import { useEffect, useState, Dispatch, SetStateAction } from "react";

export type SortOrder = "asc" | "dsc" | "";

interface TableSortProps {
  i: number;
  // tableSort: (i: number, order: "asc" | "dsc" | "") => void;
  setSortIndex: Dispatch<SetStateAction<number>>;
  setOrder: Dispatch<SetStateAction<SortOrder>>;
}
const TableSort = ({
  i,
  setOrder: setOrderContainer,
  setSortIndex, // tableSort,
}: TableSortProps) => {
  const [order, setOrder] = useState<SortOrder>("");

  const onSort = () => {
    if (order === "asc" || order === "") setOrder("dsc");
    else setOrder("asc");
  };

  useEffect(() => {
    setOrderContainer(order);
    setSortIndex(i);
  }, [order, i, setOrderContainer, setSortIndex]);

  return (
    <span onClick={onSort} className="pl-4">
      {order === "asc" || order === "" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      )}
    </span>
  );
};

export default TableSort;
