import ProductCreateForm from "../Products/ProductCreateForm";
import BackArrowButton from "../NavElements/BackArrowButton";

const ProductsCreatePage = () => {
  return (
    <>
      <div>
        <BackArrowButton />
      </div>
      <div className=" mx-auto max-w-xl">
        <ProductCreateForm />
      </div>
    </>
  );
};

export default ProductsCreatePage;
