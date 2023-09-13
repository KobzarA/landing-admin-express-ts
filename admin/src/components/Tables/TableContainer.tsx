import { /* useEffect,*/ useEffect, useState } from "react";
import TableTemplate, { TableData } from "./TableTempalte";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
// import TableFilters from "./TableFilters";
import tableFilter from "../../libs/tableHeplers/tableFilter";
import { SortOrder } from "./TableSort";
import tableSort from "../../libs/tableHeplers/tableSort";

/**
 * TODO
 * 1. Filter buttons and reset button
 * 2. Choose which columns to show
 * 3. Pagination - Done
 * 4. Make table editable
 * 5. create real table template where dev can choose which features he needs, how to display data, modify rows
 */

const TableContainer = ({ data }: { data: TableData }) => {
  const [viewData, setViewData] = useState(data);

  //Pagination
  const [currentPageData, setCurrentPageData] = useState<TableData>({
    columnsNames: [],
    rowsData: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getCurrentPageData = () => {
    let firstItem = (currentPage - 1) * itemsPerPage;
    let lastItem = firstItem + itemsPerPage;
    const currentPageRowsData = viewData.rowsData.slice(firstItem, lastItem);

    const currentPageData: TableData = {
      columnsNames: data.columnsNames,
      rowsData: currentPageRowsData,
    };

    setCurrentPageData(currentPageData);
  };

  const getMaxPage = () => {
    return Math.ceil(viewData.rowsData.length / itemsPerPage);
  };

  const handleSearchText = (searchText: string) => {
    if (searchText === "" || searchText === null) setViewData(data);
    console.info("Render handle Search text");
    setViewData(tableFilter(data, searchText));
  };

  const handleSort = (i: number, order: SortOrder) => {
    if (order === "") return;
    console.info("Render handle sort");
    setViewData(tableSort(data, i, order));
  };

  useEffect(() => {
    getCurrentPageData();
    console.log("updated current page data");
  }, [itemsPerPage, currentPage, viewData]);

  return (
    <div>
      <TableSearch onSearch={handleSearchText} />
      {/* <TableFilters onSearch={handleSearchText} /> */}
      <TableTemplate data={currentPageData} tableSort={handleSort} />
      <TablePagination
        onChangeItemsPerPage={setItemsPerPage}
        maxPage={getMaxPage()}
        onChangePage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TableContainer;
