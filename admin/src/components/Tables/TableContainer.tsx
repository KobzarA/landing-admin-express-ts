import { useEffect, useState } from "react";
import TableTemplate, { TableData } from "./TableTempalte";
import TableSearch from "./TableSearch";
import TableFilters from "./TableFilters";
import tableFilter from "./tableFilter";

const TableContainer = ({ data }: { data: TableData }) => {
  const [viewData, setViewData] = useState(data);

  const handleSearchText = (searchText: string) => {
    if (searchText === "" || searchText === null) setViewData(data);
    console.info("render");
    setViewData(tableFilter(data, searchText));
  };
  //   useEffect(() => {
  //     setViewData(tableFilters(data, ""));
  //   }, []);

  return (
    <div>
      <TableSearch onSearch={handleSearchText} />
      {/* <TableFilters onSearch={handleSearchText} /> */}
      <TableTemplate data={viewData} />
    </div>
  );
};

export default TableContainer;
