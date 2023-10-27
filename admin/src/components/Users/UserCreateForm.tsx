import { useState } from "react";
import { useCreateUserMutation } from "../../api/usersApi";

const UserCreateForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [createUser, result] = useCreateUserMutation();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createUser({ email, role, username, password });
  };

  const messageLoading = result.isLoading ? <div>Loadling...</div> : null;
  const messageSuccess = result.isSuccess ? (
    <div>User {username} successfully created! </div>
  ) : null;

  const messageError = result.isError ? (
    <div>Error while creating user: {username}. Error: </div>
  ) : null;

  return (
    <form onSubmit={handleSubmit}>
      {messageLoading || messageSuccess || messageError}
      <div className="flex flex-col items-center space-x-2">
        <label htmlFor={"username"} className="text-violet-300">
          Username
        </label>
        <input
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="text"
          id="username"
          name="username"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-x-2">
        <label htmlFor="email" className="text-violet-300">
          Email
        </label>
        <input
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="email"
          id="email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-x-2">
        <label htmlFor="password" className="text-violet-300">
          Password
        </label>
        <input
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="password"
          id="password"
          name="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-x-2">
        <label htmlFor="role" className="text-violet-300">
          Role
        </label>
        <input
          className="w-full rounded-md bg-zinc-300 px-4 py-2 dark:bg-zinc-500"
          type="text"
          id="role"
          name="email"
          defaultValue={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button
        className="mx-auto mt-3 block rounded-md border border-zinc-400 px-2 py-1 duration-500 hover:scale-105 hover:shadow-xl"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default UserCreateForm;
