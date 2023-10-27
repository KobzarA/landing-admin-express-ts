import { useEffect, useState } from "react";
import tableOrdersDataAdapter, {
  OrdersData,
} from "../../libs/tableHeplers/tableDataAdapter";
import TableContainer from "../Tables/TableContainer";
import axios from "axios";
import { API_BASE } from "../../config";

const ProductsPage = () => {
  const [fetchedData, setFetchedData] = useState<OrdersData>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios
          .get<OrdersData>(API_BASE + "products/", {
            withCredentials: true,
          })
          .then((res) => res.data);

        setFetchedData(data);
      } catch (error) {
        throw error;
      }
    };
    getData();
  }, []);

  const tableData =
    fetchedData.length !== 0 ? tableOrdersDataAdapter(fetchedData) : null;

  return (
    <>
      My greeting to Products page of admin service
      <h1>Products table</h1>
      {tableData ? <TableContainer data={tableData} /> : null}
    </>
  );
};

export default ProductsPage;
