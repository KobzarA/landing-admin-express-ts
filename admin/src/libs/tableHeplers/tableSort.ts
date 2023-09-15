import { SortOrder } from "../../components/Tables/TableSort";
import { TableData } from "../../components/Tables/TableTempalte";

/**
 * TODO Sort Dates
 */

const tableSort = (data: TableData, i: number, order: SortOrder): TableData => {
  const { columnsNames } = data;
  if (!data.rowsData.length) return data;

  switch (typeof data.rowsData[0][i]) {
    case "object":
      return data; //at this time don`t want sort objects or arrays, check for this should be at render sort component
    case "number":
      if (order === "asc") {
        const sortedRows = data.rowsData.sort(
          (a, b) => (a[i] as number) - (b[i] as number),
        );
        return { columnsNames, rowsData: sortedRows };
      } else {
        const sortedRows = data.rowsData.sort(
          (a, b) => (b[i] as number) - (a[i] as number),
        );
        return { columnsNames, rowsData: sortedRows };
      }

    case "string":
      if (order === "asc") {
        const sortedRows = data.rowsData.sort();
        return { columnsNames, rowsData: sortedRows };
      } else {
        const sortedRows = data.rowsData.sort((a, b) =>
          (b[i] as string).localeCompare(a[i] as string),
        );
        return { columnsNames, rowsData: sortedRows };
      }

    default:
      return data;
  }
};

export default tableSort;
