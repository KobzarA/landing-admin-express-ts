export interface TableData {
  columnsNames: (string | number)[];
  rowsData: (string | number | [] | object)[][];
}

const TableTemplate = ({ data }: { data: TableData }) => {
  // Check for incoming data
  if (!data.columnsNames) return <div>"No data is downloaded"</div>;

  // create table headers
  const columns = data.columnsNames.map((item) => {
    return <th className="border border-slate-600">{item}</th>;
  });

  const tdStyles = "border border-slate-700 p-2";
  const rows = data.rowsData.map((rowData) => {
    const row = rowData.map((data) => {
      // Checking if data array if yes return mapped list in cell
      if (Array.isArray(data)) {
        return (
          <td className={tdStyles}>
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
          <td className={tdStyles}>
            {" "}
            <button>Show more</button>
          </td>
        );
      }
      // in other cases data are primitives string or number
      return <td className={tdStyles}>{data}</td>;
    });

    return <tr>{row}</tr>;
  });

  return (
    <table className="table-auto border-collapse border border-slate-500">
      <thead>
        <tr>{columns}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableTemplate;
