import { Dispatch, ReactElement, SetStateAction } from "react";
import TableSort, { SortOrder } from "./TableSort";
import { ModalChangeAction, ModalChangeKind } from "./TableContainer";

export interface TableData {
  columnsNames: (string | number)[];
  rowsData: (string | number | [] | object)[][];
}

export interface TableTemplateProps {
  data: TableData;

  options?: {
    sortable?: boolean;
    editable?: boolean;
    selectColumn?: boolean;
    sortProps?: {
      setSortIndex: Dispatch<SetStateAction<number>>;
      setOrder: Dispatch<SetStateAction<SortOrder>>;
    };
    editableProps?: {
      dispatchModalChange: React.Dispatch<ModalChangeAction>;
    };
  };
}

const TableTemplate = ({ data, options }: TableTemplateProps) => {
  // Check for incoming data
  if (data.columnsNames.length === 0) return <div>"No data is downloaded"</div>;

  const { columnsNames, rowsData } = data;

  //
  //checking for options
  //

  const sorterElement = (i: number) => {
    if (!options?.sortable || !options.sortProps) return null;
    //Checking if there data rowsData & and conditional render of sort comp
    if (!rowsData.length || typeof rowsData[0][i] === "object") return null;

    return (
      <TableSort
        i={i}
        setOrder={options.sortProps.setOrder}
        setSortIndex={options.sortProps.setSortIndex}
      />
    );
  };

  const editableHeader = options?.editable ? (
    <th className="border border-slate-600 p-3">Change data</th>
  ) : null;

  const editableCell = (i: number): ReactElement | null => {
    if (!options?.editable || !options.editableProps) return null;

    return (
      <td className={`${tdStyles}`} key={i}>
        <button
          type="button"
          className="hover:text-cyan-300 active:text-cyan-500"
          onClick={() =>
            options.editableProps?.dispatchModalChange({
              type: ModalChangeKind.SHOW_EDIT_FORM,
              payload: {
                tableData: {
                  headers: columnsNames,
                  row: rowsData[i],
                },
              },
            })
          }
        >
          Edit
        </button>
      </td>
    );
  };

  //
  // create table headers with conditional render of Table sort Component
  //

  const columns = columnsNames.map((item, i) => {
    return (
      <th key={i} className=" border border-slate-600">
        <div className="mx-1 flex min-w-fit justify-between p-3">
          {item}
          {sorterElement(i)}
        </div>
      </th>
    );
  });

  //
  //Make rows JSX[]
  //

  const tdStyles = "border border-slate-700 p-4  table-cell ";
  const rows = rowsData.map((rowData, rowIndex) => {
    const row = rowData.map((data, columnIndex) => {
      // Checking if data array if yes return mapped list in cell

      if (Array.isArray(data)) {
        return (
          <td key={columnIndex} className={tdStyles} data-column={columnIndex}>
            <ol className="ml-3 list-decimal">
              {/* Beta Render of list */}
              {data.map((item, i) => (
                <li key={i}>
                  {/* {item?.product_name} - {item?.quantity} pcs. */}
                  {typeof item === "object"
                    ? Object.values<string>(item).join(" - ")
                    : item}
                </li>
              ))}
            </ol>
          </td>
        );
      } else if (typeof data === "object") {
        // check if object
        return (
          <td key={columnIndex} className={tdStyles} data-column={columnIndex}>
            {/*TODO.  Not implemented */}
            <button>Show more</button>
          </td>
        );
      }
      // in other cases data are primitives string or number
      return (
        <td key={columnIndex} className={tdStyles} data-column={columnIndex}>
          {data}
        </td>
      );
    });

    return (
      <tr key={rowIndex}>
        {row}
        {editableCell(rowIndex)}
      </tr>
    );
  });

  return (
    <>
      <table className="table-auto border-collapse border border-slate-500">
        <thead className="table-header-group">
          <tr className="table-row">
            {columns}
            {editableHeader}
          </tr>
        </thead>
        <tbody className="table-row-group">{rows}</tbody>
      </table>
    </>
  );
};

export default TableTemplate;
