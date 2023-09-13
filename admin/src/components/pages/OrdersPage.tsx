/*
    TODO:
    1.Table for all orders. <TableTemplate> maybe
    2.Change status abitity. Status enum.
    3.OrderPage.
    4.Filtering orders by ... status
    5.Sorting orders by each column
    6.Pagination with load more
    7.Some additional status to order like important or immediate

    SO there will be at least 4 components

    <Container with states>
        <Search/>
        <Filter/>
        <Table/>
        <Pagination/>


    </Container>

    NB! Comments to order like a reminder
*/

import tableOrdersDataAdapter from "../../libs/tableHeplers/tableDataAdapter";
import TableContainer from "../Tables/TableContainer";
import TableTemplate from "../Tables/TableTempalte";

const ordersJson = `
[
  {
    "order_id": "001",
    "customer_name": "John Doe",
    "products": [
      {
        "product_id": "1001",
        "product_name": "Widget",
        "quantity": 3,
        "price": 10.99
      },
      {
        "product_id": "1002",
        "product_name": "Gadget",
        "quantity": 2,
        "price": 19.99
      }
    ],
    "order_date": "2023-09-07",
    "order_status": "new"
  },
  {
    "order_id": "002",
    "customer_name": "Jane Smith",
    "products": [
      {
        "product_id": "1003",
        "product_name": "Thingamajig",
        "quantity": 5,
        "price": 7.49
      }
    ],
    "order_date": "2023-09-06",
    "order_status": "sent"
  },
  {
    "order_id": "003",
    "customer_name": "John Doe",
    "products": [
      {
        "product_id": "1001",
        "product_name": "Widget",
        "quantity": 3,
        "price": 10.99
      },
      {
        "product_id": "1002",
        "product_name": "Gadget",
        "quantity": 2,
        "price": 19.99
      }
    ],
    "order_date": "2023-09-07",
    "order_status": "canceled"
  },
  {
    "order_id": "004",
    "customer_name": "Jane Smith",
    "products": [
      {
        "product_id": "1003",
        "product_name": "Thingamajig",
        "quantity": 5,
        "price": 7.49
      }
    ],
    "order_date": "2023-09-06",
    "order_status": "success"
  }
]
`;

const orders = JSON.parse(ordersJson);

const OrdersPage = () => {
  const tableData = tableOrdersDataAdapter(orders);

  return (
    <>
      My greeting to Order page of admin service
      <h1>Yoohoo</h1>
      {/* <TableTemplate data={tableData} /> */}
      <h2>Second experimental table</h2>
      <TableContainer data={tableData} />
    </>
  );
};

export default OrdersPage;
