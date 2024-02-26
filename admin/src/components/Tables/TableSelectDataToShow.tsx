import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TableData } from "./TableTempalte";

interface TableSelectDataToShowProps {
  data: TableData;
  setActiveCheckBoxes: Dispatch<
    SetStateAction<(string | number)[] | undefined>
  >;
  options: {
    changeData: "onsubmit" | "onchange";
    dataToChoose: "columns" | "dataTree";
    collapseComponentVisibility?: boolean;
    dataTree?: {};
  };
}

const TableSelectDataToShow = ({
  data,
  setActiveCheckBoxes: setList,
  options,
}: TableSelectDataToShowProps) => {
  const [activeCheckBoxes, setActiveCheckBoxes] = useState(data.columnsNames);

  const handleChange = (columnName: string | number) => {
    if (activeCheckBoxes.includes(columnName)) {
      const newList = activeCheckBoxes.filter(
        (column) => column.toString() !== columnName.toString(),
      );
      setActiveCheckBoxes(newList);
    } else {
      setActiveCheckBoxes([...activeCheckBoxes, columnName]);
    }
  };

  const createCheckboxes = () => {
    if (options.dataToChoose === "columns") {
      return data.columnsNames.map((columnName) => {
        const columnNameString =
          typeof columnName === "string" ? columnName : columnName.toString();
        return (
          <div className="border-color my-2 space-x-4 rounded-sm border  p-2   dark:border-lime-100">
            <input
              className="accent-emerald-500 "
              name={columnNameString}
              id={columnNameString}
              value={columnName}
              type="checkbox"
              checked={activeCheckBoxes.includes(columnName)}
              onChange={() => {
                handleChange(columnName);
              }}
            />
            <label htmlFor={columnNameString}>{columnName}</label>
          </div>
        );
      });
    } else {
      return (
        <div className="border border-lime-100">
          <label htmlFor={"checkbox"}>{"checkbox"}</label>
          <input
            name={"checkbox"}
            id={"checkbox"}
            value={"checkbox"}
            type="checkbox"
          />
        </div>
      );
    }
  };

  const elements = createCheckboxes();

  useEffect(() => {
    setList(activeCheckBoxes);
  }, [activeCheckBoxes, setList]);
  return <form className=" flex space-x-3 p-4">{elements}</form>;
};

export default TableSelectDataToShow;
