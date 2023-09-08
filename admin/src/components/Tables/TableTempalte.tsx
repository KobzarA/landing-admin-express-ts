export interface TableData {
  columnsNames: (string | number)[];
  rowsData: (string | number | [] | object)[][];
}

const TableTemplate = ({ data }: { data: TableData }) => {
  debugger;
  if (!data.columnsNames) return <div>"No data is downloaded"</div>;

  const columns = data.columnsNames.map((item) => {
    return <th>{item}</th>;
  });

  const rows = data.rowsData.map((rowData) => {
    const row = rowData.map((data) => {
      if (Array.isArray(data)) {
        return (
          <td>
            {data.map((item) => (
              <>
                {item?.product_name} <br />
              </>
            ))}
          </td>
        );
      } else if (typeof data === "object") {
        return (
          <td>
            {" "}
            <button>Show more</button>
          </td>
        );
      }

      return <td>{data}</td>;
    });

    return <tr>{row}</tr>;
  });

  return (
    <table>
      <thead>
        <tr>{columns}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableTemplate;
