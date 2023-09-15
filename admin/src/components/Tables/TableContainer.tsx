import { useCallback, useEffect, useState } from "react";
import TableTemplate, { TableData } from "./TableTempalte";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import TableFilters from "./TableFilters";
import tableFilter from "../../libs/tableHeplers/tableFilter";
import { SortOrder } from "./TableSort";
import tableSort from "../../libs/tableHeplers/tableSort";
import debounce from "../../libs/debounce";

/**
 * TODO
 *+ 1. Filter buttons -  TODO refactor need [button_names, button_value]
 * 2. Choose which columns to show
 * 3. Pagination - Done
 * 4. Make table editable
 * 5. create real table template where dev can choose which features he needs, how to display data, modify rows
 * 6. All states in container
 * 7. reset button
 */

const TableContainer = ({ data }: { data: TableData }) => {
  console.count("Table Container");

  const [viewData, setViewData] = useState(data);

  // Pagination
  const [currentPageData, setCurrentPageData] = useState<TableData>({
    columnsNames: [],
    rowsData: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getMaxPage = () => {
    return Math.ceil(viewData.rowsData.length / itemsPerPage);
  };

  const getCurrentPageData = useCallback(
    (viewData: TableData) => {
      let firstItem = (currentPage - 1) * itemsPerPage;
      let lastItem = firstItem + itemsPerPage;
      const currentPageRowsData = viewData.rowsData.slice(firstItem, lastItem);

      const newPageData: TableData = {
        columnsNames: viewData.columnsNames,
        rowsData: currentPageRowsData,
      };

      return newPageData;
    },
    [itemsPerPage, currentPage],
  );
  //
  // Search
  //

  const [searchText, setSearchText] = useState<string>("");

  const debouncedSetSearchText = debounce(setSearchText, 300);
  const handleSearchText = (searchText: string, data: TableData) => {
    if (searchText === "" || searchText === undefined) {
      return data;
    } else {
      // console.count("Render handle Search text");
      return tableFilter(data, searchText);
    }
  };

  //
  // Filter - at this time only one active filter
  //

  const [filterText, setFilterText] = useState("");

  const handleFilter = (searchText: string, data: TableData) => {
    if (searchText === "" || searchText === null) {
      return data;
    } else {
      // console.count("Render handle Search text");
      return tableFilter(data, searchText);
    }
  };

  //
  // Sort
  //

  const [sortIndex, setSortIndex] = useState(0);
  const [order, setOrder] = useState<SortOrder>("");

  const handleSort = (i: number, order: SortOrder, data: TableData) => {
    if (order === "") return data;
    // console.count("Render handle sort");
    return tableSort(data, i, order);
  };

  // Changing view data if changed filter or search or data
  //
  // Changing Page data if changed filter or search or data
  useEffect(() => {
    const newViewData = handleSort(
      sortIndex,
      order,
      handleSearchText(searchText, handleFilter(filterText, data)),
    );

    const newCurrentPageData = getCurrentPageData(newViewData);
    console.log("updated current page data");
    setViewData(newViewData);
    setCurrentPageData(newCurrentPageData);
  }, [
    sortIndex,
    order,
    searchText,
    filterText,
    data,
    itemsPerPage,
    currentPage,
    getCurrentPageData,
  ]);

  return (
    <div>
      <TableSearch debouncedSetSearchText={debouncedSetSearchText} />
      <TableFilters filterText={filterText} setFilterText={setFilterText} />
      <TableTemplate
        data={currentPageData}
        options={{
          sortable: true,
          sortProps: { setOrder: setOrder, setSortIndex: setSortIndex },
        }}
      />
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
