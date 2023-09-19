import { useCallback, useEffect, useReducer, useState } from "react";
import TableTemplate, { TableData } from "./TableTempalte";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import TableFilters from "./TableFilters";
import TableSelectDataToShow from "./TableSelectDataToShow";
import tableFilter from "../../libs/tableHeplers/tableFilter";
import { SortOrder } from "./TableSort";
import tableSort from "../../libs/tableHeplers/tableSort";
import debounce from "../../libs/debounce";
import ModalTemplate from "../Modal/ModalTemplate";
import TableChangeRowData from "./TableChangeRowData";

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

// Edit modal anotations
export enum ModalChangeKind {
  DISABLED = "DISABLED",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  SHOW_EDIT_FORM = "SHOW_EDIT_FORM",
  SENDING = "SENDING",
}

interface ModalChangeState {
  status: ModalChangeKind;
  data: {
    tableData?: {
      headers: (string | number)[];
      row: (string | number | object | [])[];
    };
  } | null;
  message: string | null;
}

export interface ModalChangeAction {
  type: ModalChangeKind;
  payload: {
    tableData?: {
      headers: (string | number)[];
      row: (string | number | object | [])[];
    };
    message?: string;
  } | null;
}

// Select anotation
export interface ihandleSelect {
  (select: (string | number)[] | undefined, data: TableData): TableData;
}

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

  const debouncedSetSearchText = debounce(setSearchText, 500);
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

  //
  // Handle select
  //

  const [activeCheckBoxes, setActiveCheckBoxes] =
    useState<(string | number)[]>();

  const debouncedSetActiveCheckBoxes = debounce(setActiveCheckBoxes, 500);
  const handleSelect: ihandleSelect = (select, data) => {
    if (!select) return data;

    // filter columnName

    const newColumnNames = data.columnsNames.filter((columnName) =>
      select.includes(columnName),
    );
    const indexesToShow = newColumnNames.map((columnName) => {
      return data.columnsNames.indexOf(columnName);
    });
    debugger;
    const newRowsData = data.rowsData.map((row) =>
      row.filter((tableCell, i) => indexesToShow.includes(i)),
    );

    return { columnsNames: newColumnNames, rowsData: newRowsData };
  };

  //
  // Edit table
  //

  //Reducer

  const reducerModalChange = (
    state: ModalChangeState,
    action: ModalChangeAction,
  ) => {
    const { type, payload } = action;
    switch (type) {
      case ModalChangeKind.DISABLED:
        return { ...state, status: ModalChangeKind.DISABLED };
      case ModalChangeKind.SUCCESS:
        return { ...state, status: ModalChangeKind.SUCCESS };
      case ModalChangeKind.ERROR:
        return { ...state, status: ModalChangeKind.ERROR };
      case ModalChangeKind.SHOW_EDIT_FORM:
        return {
          ...state,
          status: ModalChangeKind.SHOW_EDIT_FORM,
          data: payload,
        };
      case ModalChangeKind.SENDING:
        return { ...state, status: ModalChangeKind.SENDING };
      default:
        throw new Error("Unknown action");
    }
  };

  //Complex state made by useReducer
  const [modalChange, dispatchModalChange] = useReducer(reducerModalChange, {
    status: ModalChangeKind.DISABLED,
    data: null,
    message: null,
  });

  // Conditional render of modal
  const modal = () => {
    const modalProps = {
      closeModal: () =>
        dispatchModalChange({
          type: ModalChangeKind.DISABLED,
          payload: null,
        }),
      timeout: 3000,
    };
    switch (modalChange.status) {
      case ModalChangeKind.DISABLED:
        return null;
      case ModalChangeKind.SHOW_EDIT_FORM:
        return (
          <ModalTemplate {...modalProps} timeout={0}>
            <TableChangeRowData
              tableData={modalChange.data?.tableData!}
              sendData={console.log}
            />
          </ModalTemplate>
        );
      case ModalChangeKind.SUCCESS:
        return <ModalTemplate {...modalProps} />;
      case ModalChangeKind.ERROR:
        return <ModalTemplate {...modalProps} />;
      case ModalChangeKind.SENDING:
        return <ModalTemplate {...modalProps} />;
    }
  };

  // Changing view data if changed filter or search or data
  //
  // Changing Page data if changed filter or search or data
  useEffect(() => {
    const newViewData = handleSort(
      sortIndex,
      order,
      handleSearchText(
        searchText,
        handleFilter(filterText, handleSelect(activeCheckBoxes, data)),
      ),
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
    activeCheckBoxes,
    getCurrentPageData,
  ]);

  return (
    <div>
      <TableSearch debouncedSetSearchText={debouncedSetSearchText} />
      <TableFilters filterText={filterText} setFilterText={setFilterText} />
      <TableSelectDataToShow
        data={data}
        setActiveCheckBoxes={debouncedSetActiveCheckBoxes}
        options={{ changeData: "onchange", dataToChoose: "columns" }}
      />
      <TableTemplate
        data={currentPageData}
        options={{
          sortable: true,
          sortProps: { setOrder: setOrder, setSortIndex: setSortIndex },
          editable: true,
          editableProps: {
            dispatchModalChange: dispatchModalChange,
          },
        }}
      />
      <TablePagination
        onChangeItemsPerPage={setItemsPerPage}
        maxPage={getMaxPage()}
        onChangePage={setCurrentPage}
        currentPage={currentPage}
      />
      {modal()}
    </div>
  );
};

export default TableContainer;
