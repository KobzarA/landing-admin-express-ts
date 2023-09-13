import { Dispatch, SetStateAction } from "react";

const TablePagination = ({
  onChangeItemsPerPage,
  maxPage,
  onChangePage,
  currentPage,
}: {
  onChangeItemsPerPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
  onChangePage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}) => {
  console.log("render Pagination");

  const pagesList = () => {
    let linkList = [];
    for (let i = 1; i <= maxPage; i++) {
      linkList.push(
        <li key={`page${i}`}>
          <button
            className={
              currentPage === i ? "text-cyan-500" : "hover:text-cyan-300"
            }
            disabled={currentPage === i}
            onClick={() => onChangePage(i)}
          >
            {i}
          </button>
        </li>,
      );
    }
    return (
      <ul className="flex w-full flex-row justify-center space-x-6 ">
        {linkList}
      </ul>
    );
  };

  const list = pagesList();

  return (
    <div className="flex w-full space-x-4 pt-4">
      <select
        name="tablePagination"
        defaultValue={10}
        className="rounded bg-slate-200 p-2 dark:bg-slate-700"
        onChange={(e) => onChangeItemsPerPage(+e.target.value)}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      {/* list of pages */}
      {list}
    </div>
  );
};

export default TablePagination;
