import { useCreateProductMutation } from "../../api/productsApi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IProduct } from "../../interfaces/models";

import * as Yup from "yup";
import { useEffect, useState } from "react";

const UserCreateForm2 = () => {
  const [addProduct, result] = useCreateProductMutation();

  //Todo messageDisappearing
  const [showResMessage, setShowResMessage] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    sku: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (result.isSuccess === true || result.isSuccess === false) {
      setShowResMessage(true);
      timer = setTimeout(() => {
        setInitialValues({
          name: "",
          price: "",
          sku: "",
          description: "",
          image: "",
        });

        setShowResMessage(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [result.isSuccess]);

  const messageLoading = result.isLoading ? <div>Loadling...</div> : null;
  const messageSuccess = result.isSuccess ? (
    <div>Product successfully added! </div>
  ) : null;
  const messageError = result.isError ? (
    <div>Error while adding product. Error: </div>
  ) : null;

  const productSchema: Yup.ObjectSchema<Omit<IProduct, "_id">> = Yup.object({
    name: Yup.string()
      .min(3, "Must be at least 3 characters  ")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    price: Yup.number().required(),
    sku: Yup.number().required(),
    description: Yup.string().optional(),
    image: Yup.string().optional(),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={(values, { setSubmitting }) => {
          // @ts-ignore
          addProduct(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center space-x-2">
            <label htmlFor={"name"} className="text-violet-300">
              Item name
            </label>
            <Field
              name="name"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="sku" className="text-violet-300">
              SKU
            </label>
            <Field
              name="sku"
              type="number"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            />
            <ErrorMessage
              name="sku"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="price" className="text-violet-300">
              Price USD
            </label>
            <Field
              name="price"
              type="number"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            />
            <ErrorMessage
              name="price"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="description" className="text-violet-300">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            ></Field>
            <ErrorMessage
              name="description"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="image" className="text-violet-300">
              Choose image{" "}
            </label>
            <Field
              type="file"
              name="image"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            ></Field>
            <ErrorMessage
              name="image"
              component="div"
              className=" text-center text-red-500"
            />
            <button
              className="mx-auto mt-3 block rounded-md border border-zinc-400 px-2 py-1 duration-500 hover:scale-105 hover:shadow-xl"
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
      {showResMessage ? messageLoading || messageSuccess || messageError : null}
    </>
  );
};

export default UserCreateForm2;
