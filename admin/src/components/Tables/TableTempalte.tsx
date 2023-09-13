import { ReactNode } from "react";
import TableSort from "./TableSort";

export interface TableData {
  columnsNames: (string | number)[];
  rowsData: (string | number | [] | object)[][];
}

const TableTemplate = ({
  data,
  tableSort,
}: {
  data: TableData;
  tableSort: (i: number, order: "asc" | "dsc" | "") => void;
}) => {
  // Check for incoming data
  if (!data.columnsNames) return <div>"No data is downloaded"</div>;
  const { columnsNames, rowsData } = data;
  // create table headers
  const columns = columnsNames.map((item, i) => {
    return (
      <th key={i} className=" border border-slate-600">
        <div className="mx-1 flex min-w-fit justify-between p-3">
          {item}
          {typeof rowsData[0][i] !== "object" ? (
            <TableSort i={i} tableSort={tableSort} />
          ) : null}
        </div>
      </th>
    );
  });

  //Make rows JSX[]
  const tdStyles = "border border-slate-700 p-4  table-cell ";
  const rows = rowsData.map((rowData) => {
    const row = rowData.map((data, i) => {
      // Checking if data array if yes return mapped list in cell
      if (Array.isArray(data)) {
        return (
          <td className={tdStyles} data-column={columnsNames[i]}>
            <ol className="ml-3 list-decimal">
              {data.map((item, i) => (
                <li key={i}>
                  {item?.product_name} - {item?.quantity} pcs.
                </li>
              ))}
            </ol>
          </td>
        );
      } else if (typeof data === "object") {
        // check if object
        return (
          <td className={tdStyles} data-column={columnsNames[i]}>
            {/*TODO.  Not implemented */}
            <button>Show more</button>
          </td>
        );
      }
      // in other cases data are primitives string or number
      return (
        <td className={tdStyles} data-column={columnsNames[i]}>
          {data}
        </td>
      );
    });

    return <tr>{row}</tr>;
  });

  return (
    <table className="table-auto border-collapse border border-slate-500">
      <thead className="table-header-group">
        <tr className="table-row">{columns}</tr>
      </thead>
      <tbody className="table-row-group">{rows}</tbody>
    </table>
  );
};

export default TableTemplate;
