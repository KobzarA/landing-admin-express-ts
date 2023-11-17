import { IUser } from "../../../../shared/src/types/models";
import { useUpdateUserMutation } from "../../api/usersApi";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

const UserEditForm2 = ({ user }: { user: IUser }) => {
  const [updateUser, result] = useUpdateUserMutation();

  const messageLoading = result.isLoading ? <div>Loadling...</div> : null;
  const messageSuccess = result.isSuccess ? (
    <div>User successfully edited! </div>
  ) : null;
  const messageError = result.isError ? (
    <div>Error while editing user. Error: </div>
  ) : null;

  const formInner = Object.entries(user).map(([key, value]) => {
    return (
      <div key={key} className="flex flex-col items-center space-x-2">
        <label htmlFor={key} className="text-violet-300">
          {key}
        </label>
        {key !== "role" ? (
          <Field
            className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
            type="text"
            name={key}
            defaultValue={value}
          />
        ) : (
          <Field
            as="select"
            name="role"
            className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          >
            <option value="admin">Admin</option>

            <option value="manager">Manager</option>

            <option value="client">Client</option>
          </Field>
        )}
        <ErrorMessage
          name={key}
          component="div"
          className=" text-center text-red-500"
        />
      </div>
    );
  });
  return (
    <>
      <Formik
        initialValues={user}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Must be at least 3 characters  ")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          role: Yup.string().oneOf(["admin", "manager", "client"]),
        })}
        onSubmit={(values) => {
          updateUser({ username: user.username, newUserData: values });
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

export default UserEditForm2;
