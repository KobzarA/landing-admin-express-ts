import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TableSearchProps {
  debouncedSetSearchText: Dispatch<SetStateAction<string>>;
}

const TableSearch = ({ debouncedSetSearchText }: TableSearchProps) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    debouncedSetSearchText(input);
  }, [input, debouncedSetSearchText]);
  return (
    <>
      <label className="mt-5 block" htmlFor="tableSearch">
        Look for simple data
      </label>
      <input
        type="search"
        name="tableSearch"
        id="tableSearch"
        placeholder="Search ..."
        className="my-2 block rounded-xl bg-zinc-400 p-1 px-2 text-white placeholder:text-zinc-800"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </>
  );
};

export default TableSearch;
