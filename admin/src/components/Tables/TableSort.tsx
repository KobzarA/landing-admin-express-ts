/***
 * This elememts could be several in table
 * it should check type of data
 * shown as arrow up or down on <th>
 *  have a state asc dcs
 * should change viewData with setViewData, also should read viewData
 * know in which row it is it
 * sort row data by own index in needed order
 * useEffect to update global state
 */

import { useEffect, useState } from "react";

export type SortOrder = "asc" | "dsc" | "";
const TableSort = ({
  i,
  tableSort,
}: {
  i: number;
  tableSort: (i: number, order: SortOrder) => void;
}) => {
  const [order, setOrder] = useState<SortOrder>("");

  const onSort = () => {
    if (order === "asc" || order === "") setOrder("dsc");
    else setOrder("asc");
  };

  useEffect(() => {
    tableSort(i, order);
  }, [order]);

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
