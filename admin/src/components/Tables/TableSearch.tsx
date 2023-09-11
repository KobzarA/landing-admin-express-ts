import { useEffect, useState } from "react";

const TableSearch = ({ onSearch }: { onSearch: (search: string) => void }) => {
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);
  return (
    <>
      <label className="mt-5 block" htmlFor="tableSearch">
        Look for simple data
      </label>
      <input
        type="search"
        name="tableSearch"
        id="tableSearch"
        className="my-2 block rounded-xl bg-zinc-400 p-1 text-white"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
    </>
  );
};

export default TableSearch;
