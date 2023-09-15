import { MouseEvent, Dispatch, SetStateAction } from "react";

interface TableFilterProps {
  filterText: string;
  setFilterText: Dispatch<SetStateAction<string>>;
  // btnsData: string[][];
}

const bdtnsData: string[][] = [
  ["All", ""],
  ["New", "new"],
  ["Sent", "sent"],
  ["Success", "success"],
];

const TableFilters = ({ filterText, setFilterText }: TableFilterProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFilterText(e.currentTarget.value);
  };

  const btns = bdtnsData.map((btnData) => (
    <button
      key={btnData[0]}
      type="button"
      value={btnData[1]}
      onClick={handleClick}
      disabled={filterText === btnData[1]}
      className={
        filterText === btnData[1] ? "text-cyan-500" : "hover:text-cyan-300"
      }
    >
      {btnData[0]}
    </button>
  ));
  return <div className="flex justify-end space-x-2">{btns}</div>;
};

export default TableFilters;
