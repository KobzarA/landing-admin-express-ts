import { MouseEvent } from "react";

const TableFilters = ({ onSearch }: { onSearch: (search: string) => void }) => {
  // onSearch("");
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onSearch(e.currentTarget.value);
  };

  return (
    <div className="flex justify-end space-x-2">
      <button type="button" value={""} onClick={handleClick}>
        All
      </button>
      <button type="button" value={"new"} onClick={handleClick}>
        New
      </button>
      <button type="button" value={"sent"} onClick={handleClick}>
        Sent
      </button>
    </div>
  );
};

export default TableFilters;
