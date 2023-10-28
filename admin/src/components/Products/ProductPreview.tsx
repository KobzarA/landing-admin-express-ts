export interface Product {
  sku: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

let noImageUrl = "";

const ProductPreview = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="border border-zinc-600 px-4 py-5">
        <div className="h-20 w-20">
          <img
            className=" object-contain"
            src={data.image ? data.image : noImageUrl}
            alt={data.name}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>{data.sku}</div>
          <div>{data.price}</div>
        </div>
        <h3>{data.name}</h3>
        <div className="flex items-center justify-between">
          <button type="button">Edit</button>
          <button type="button">Delete</button>
        </div>
      </div>
    </>
  );
};

export default ProductPreview;
