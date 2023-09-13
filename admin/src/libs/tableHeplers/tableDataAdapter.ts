import { TableData } from "../../components/Tables/TableTempalte";

interface Order {
  [s: string]: string | number;
}
type OrdersData = Order[];

const tableOrdersDataAdapter = (data: OrdersData): TableData | never => {
  if (!data) throw new Error("No data");
  const columnsNames = Object.keys(data[0]);
  const rowsData = data.map((rowObj) => {
    const row = Object.values(rowObj);
    return row;
  });

  return { columnsNames, rowsData };
};

export default tableOrdersDataAdapter;
