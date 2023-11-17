import { useCreateUserMutation } from "../../api/usersApi";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

//  const MyTextInput = ({ label, ...props }) => {
//    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]

//    // which we can spread on <input>. We can use field meta to show an error

//    // message if the field is invalid and it has been touched (i.e. visited)

//    const [field, meta] = useField(props);

//    return (
//      <>
//        <label htmlFor={props.id || props.name}>{label}</label>

//        <input className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500" {...field} {...props} />

//        <ErrorMessage name={props.name} />
//      </>
//    );
//  };

// const MySelect = ({ label, ...props }: {label: string, props:}) => {
//   const [field, meta] = useField(props);

//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>

//       <select {...field} {...props} />

//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

const UserCreateForm2 = () => {
  const [createUser, result] = useCreateUserMutation();

  //Todo messageDisappearing
  const messageLoading = result.isLoading ? <div>Loadling...</div> : null;
  const messageSuccess = result.isSuccess ? (
    <div>User successfully created! </div>
  ) : null;
  const messageError = result.isError ? (
    <div>Error while creating user. Error: </div>
  ) : null;

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          role: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Must be at least 3 characters  ")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              {
                message: ` Has minimum 8 characters in length. \n
    At least one uppercase English letter. \n
    At least one lowercase English letter. \n
    At least one digit.\n
    At least one special character`,
              },
            )
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          role: Yup.string()
            .oneOf(["admin", "manager", "client"])
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          createUser(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center space-x-2">
            <label htmlFor={"username"} className="text-violet-300">
              Username
            </label>
            <Field
              name="username"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            />
            <ErrorMessage
              name="username"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="email" className="text-violet-300">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="password" className="text-violet-300">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className=" text-center text-red-500"
            />
            <label htmlFor="role" className="text-violet-300">
              Role
            </label>
            <Field
              as="select"
              name="role"
              className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            >
              <option value="admin">Admin</option>

              <option value="manager">Manager</option>

              <option value="client">Client</option>
            </Field>
            <ErrorMessage
              name="role"
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
      {messageLoading || messageSuccess || messageError}
    </>
  );
};

export default UserCreateForm2;
