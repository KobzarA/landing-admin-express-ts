import { /* useEffect,*/ useState } from "react";
import TableTemplate, { TableData } from "./TableTempalte";
import TableSearch from "./TableSearch";
// import TableFilters from "./TableFilters";
import tableFilter from "../../libs/tableHeplers/tableFilter";
import { SortOrder } from "./TableSort";
import tableSort from "../../libs/tableHeplers/tableSort";

/**
 * TODO
 * 1. Filter buttons and reset button
 * 2. Choose which columns to show
 * 3. Pagination
 * 4. Make table editable
 * 5. create real table template where dev can choose which features he needs, how to display data, modify rows
 */

const TableContainer = ({ data }: { data: TableData }) => {
  const [viewData, setViewData] = useState(data);

  const handleSearchText = (searchText: string) => {
    if (searchText === "" || searchText === null) setViewData(data);
    console.info("render");
    setViewData(tableFilter(data, searchText));
  };

  const handleSort = (i: number, order: SortOrder) => {
    if (order === "") return;

    setViewData(tableSort(data, i, order));
  };

  return (
    <div>
      <TableSearch onSearch={handleSearchText} />
      {/* <TableFilters onSearch={handleSearchText} /> */}
      <TableTemplate data={viewData} tableSort={handleSort} />
    </div>
  );
};

export default TableContainer;
