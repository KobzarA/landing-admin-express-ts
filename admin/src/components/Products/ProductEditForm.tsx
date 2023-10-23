import { IProduct } from "../../interfaces/models";
import { useUpdateProductMutation } from "../../api/productsApi";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import { TableData } from "../Tables/TableTempalte";

const ProductEditForm = ({ product }: { product: TableData }) => {
  const [updateProduct, result] = useUpdateProductMutation();

  const messageLoading = result.isLoading ? <div>Loadling...</div> : null;
  const messageSuccess = result.isSuccess ? (
    <div>Product successfully edited! </div>
  ) : null;
  const messageError = result.isError ? (
    <div>Error while editing product. Error: </div>
  ) : null;

  const formInner = product.columnsNames.map((keyName, i) => {
    if (keyName === "id") return <></>;
    return (
      <div key={keyName} className="flex flex-col items-center space-x-2">
        <label htmlFor={`${keyName}`} className="text-violet-300">
          {keyName}
        </label>
        <Field
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="text"
          name={keyName}
          defaultValue={product.rowsData[0][i]}
        />
        <ErrorMessage
          name={`${keyName}`}
          component="div"
          className=" text-center text-red-500"
        />
      </div>
    );
  });

  const validationSchema: Yup.ObjectSchema<Omit<IProduct, "_id">> = Yup.object({
    name: Yup.string()
      .min(3, "Must be at least 3 characters  ")
      .required("Required"),
    description: Yup.string().optional(),
    image: Yup.string().optional(),
    sku: Yup.number().required(),
    price: Yup.number().required().positive(),
  });

  // interface Product extends Yup.InferType<typeof validationSchema> {
  //   // using interface instead of type generally gives nicer editor feedback
  // }
  return (
    <>
      <Formik
        initialValues={product}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateProduct({
            // @ts-ignore
            id: product.rowsData[0][
              product.columnsNames.findIndex((item) => item === "id")
            ],
            // @ts-ignore
            newProductData: values,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {formInner}
            <button
              className="mx-auto mt-3 block rounded-md border border-zinc-400 px-2 py-1 duration-500 hover:scale-105 hover:shadow-xl"
              type="submit"
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
      {messageLoading || messageSuccess || messageError}
    </>
  );
};

export default ProductEditForm;
