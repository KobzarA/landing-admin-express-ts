import { IUser } from "../../interfaces/models";
import { useUpdateUserMutation } from "../../api/usersApi";
import { useState } from "react";

const UserEditForm = ({ user }: { user: IUser }) => {
  const [newUserData, setNewUserData] = useState(user);
  const [updateUser, result] = useUpdateUserMutation();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      updateUser({ username: user.username, newUserData }).then(
        (res) => {
          console.log(res);
        },
        (rej) => {
          console.log(rej);
        },
      );
    } catch (error) {
      console.log(result.error);
    }
  };

  const formInner = Object.entries(user).map(([key, value]) => {
    return (
      <div key={key} className="flex flex-col items-center space-x-2">
        <label htmlFor={key} className="text-violet-300">
          {key}
        </label>
        <input
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="text"
          id={key}
          name={key}
          defaultValue={value}
          onChange={(e) =>
            setNewUserData({ ...newUserData, [e.target.name]: e.target.value })
          }
        />
      </div>
    );
  });
  return (
    <form onSubmit={handleSubmit}>
      {formInner}
      <button
        className="mx-auto mt-3 block rounded-md border border-zinc-400 px-2 py-1 duration-500 hover:scale-105 hover:shadow-xl"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default UserEditForm;
