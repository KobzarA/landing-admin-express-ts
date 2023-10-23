import { IProduct } from "../../interfaces/models";
import ProductListItemView from "./ProductListItemView";

const ProductListView = ({ data }: { data: IProduct[] }) => {
  const items = data.map((item) => <ProductListItemView product={item} />);

  return (
    <ul className=" space-y-2 divide-y ">
      <li className="grid grid-flow-row grid-cols-5 grid-rows-1 font-bold ">
        {/* columns */}
        <div>Item name</div>
        <div>SKU</div>
        <div>Price</div>
        <div>Description</div>
      </li>
      {/* map list from data */}
      {items}
    </ul>
  );
};

export default ProductListView;
