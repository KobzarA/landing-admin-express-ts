import { TableData } from "../../components/Tables/TableTempalte";

const tableFilter = (data: TableData, filter: string): TableData => {
  const filteredRow = data.rowsData.filter((row) => {
    ;
    return row.find((elem) => {
      if (typeof elem === "object" && !Array.isArray(elem)) {
        // Not implemented
        return false;
        // return Object.values(elem).includes(filter);
      } else if (Array.isArray(elem)) {
        // Not implemented
        return false;
      }
      return elem.toString().toLowerCase().includes(filter.toLowerCase());
    });
  });
  const filteredData = {
    rowsData: filteredRow,
    columnsNames: data.columnsNames,
  };
  return filteredData;
};

export default tableFilter;
