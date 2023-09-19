import { useState } from "react";

interface TableChangeRowDataProps {
  tableData: {
    headers: (string | number)[];
    row: (string | number | object | [])[];
  };
  closeMethod?: Function;
  sendData: Function;
}

const TableChangeRowData = ({
  tableData,
  closeMethod,
  sendData,
}: TableChangeRowDataProps) => {
  const initialState = () => {
    const temp = tableData.headers.map((item, i) => {
      return [item, tableData.row[i]];
    });

    return Object.fromEntries(temp);
  };
  const [formState, setFormState] = useState(initialState());

  const formInner = tableData.headers.map((item, i) => {
    if (typeof tableData.row[i] === "object") return null;
    return (
      <div key={item} className="flex flex-col items-center space-x-2">
        <label htmlFor={item.toString()} className="text-violet-300">
          {item}
        </label>
        <input
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="text"
          id={item.toString()}
          name={item.toString()}
          defaultValue={tableData.row[i] as string | number}
          onChange={(e) =>
            setFormState({ ...formState, [e.target.name]: e.target.value })
          }
        />
      </div>
    );
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendData(formState);
      }}
    >
      {formInner}
      <button
        className="mx-auto mt-3 block rounded-md border border-zinc-400 px-2 py-1 duration-500 hover:scale-105 hover:shadow-xl"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default TableChangeRowData;
