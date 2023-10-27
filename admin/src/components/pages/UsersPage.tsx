import { useGetAllUsersQuery } from "../../api/usersApi";
import { Link } from "react-router-dom";

import UsersList from "../Users/UsersList";

const UsersPage = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(data);
  if (!data?.success) return <div>Error</div>;
  return (
    <div>
      <h2 className=" mb-4 text-center font-mono text-xl font-bold">Users</h2>
      <div className="flex ">
        <Link
          to={"/users/create"}
          className="flex space-x-3  hover:text-cyan-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          <span>Create new user</span>
        </Link>
      </div>
      <UsersList users={data.data} />
    </div>
  );
};

export default UsersPage;
