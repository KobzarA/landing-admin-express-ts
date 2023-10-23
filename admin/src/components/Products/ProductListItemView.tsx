import { IProduct } from "../../interfaces/models";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../api/productsApi";

const ProductListItemView = ({ product }: { product: IProduct }) => {
  const [deleteProduct, deleteResult] = useDeleteProductMutation();
  const [updateProduct, updateResult] = useUpdateProductMutation();
  return (
    <li
      key={product._id}
      className="grid grid-flow-row grid-cols-5 grid-rows-1"
    >
      <div>{product.name}</div>
      <div>{product.sku}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
      {/* todo image2 */}
      {/* Edit & delete buttons */}
      <div className="flex justify-center space-x-4">
        <button>Edit</button>
        <button
          onClick={() => deleteProduct(product._id)}
          disabled={deleteResult.isLoading}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProductListItemView;
