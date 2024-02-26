import productTableAdapter from "../../libs/tableHeplers/adapters/productTableAdapter";
import TableContainer from "../Tables/TableContainer";
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../api/productsApi";
import TableContainerv2 from "../Tables/TableContainer_v2";
import ProductEditForm from "../Products/ProductEditForm";
import { IProduct } from "../../interfaces/models";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductListView from "../Products/ProductsListView";

const ProductsPage = () => {
  const [productsView, setProductsView] = useState<"list" | "table">("list");
  const { data, isLoading, isError, error } = useGetAllProductsQuery();
  const [updateProduct, result] = useUpdateProductMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error blya{JSON.stringify(error)}</div>;
  if (!data?.success) return <div>Error</div>;

  const tableData =
    data.data.length !== 0 ? productTableAdapter(data.data) : null;

  const tableView = tableData ? (
    <TableContainerv2
      data={tableData}
      config={{
        search: false,
        edit: {
          //   customEditForm: (data: IProduct) => (
          //     <ProductEditForm product={data} />
          //   ),
          // sendData: updateProduct,
        },
        selectRows: false,
        filter: false,
        // edit: false,
        pagination: false,
      }}
    />
  ) : null;

  const listView = <ProductListView data={data.data} />;

  return (
    <>
      My greeting to Products page of admin service
      <h1>Products table</h1>
      <ul className="my-7 flex justify-center space-x-4">
        <li>
          <button className=" rounded-md border border-indigo-900 px-4 py-2 hover:text-cyan-300">
            <Link
              to="/products/create"
              className="flex space-x-3  hover:text-cyan-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
              <span>Create new product</span>
            </Link>
          </button>
        </li>
        <li>
          <button className=" rounded-md border border-indigo-900 px-4 py-2 hover:text-cyan-300">
            Upload products from xls,csv or json{" "}
          </button>{" "}
          - TODO
        </li>
        <li>
          <button
            onClick={() => {
              setProductsView(productsView === "list" ? "table" : "list");
            }}
            className=" rounded-md border border-indigo-900 px-4 py-2 hover:text-cyan-300"
          >
            Change view mode to {productsView === "list" ? "Table" : "List"}
          </button>
        </li>
      </ul>
      {/* {tableData ? <TableContainer data={tableData} /> : null} */}
      {productsView === "list" ? listView : tableView}
    </>
  );
};

export default ProductsPage;
