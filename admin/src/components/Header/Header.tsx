import { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import SwitcherTheme from "./SwitcherTheme";
import { IUser } from "../App";
import { logout } from "../../libs/auth";

const Header = ({
  user,
  setUser,
}: {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<null | IUser>>;
}) => {
  const [userControl, setUserContol] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="flex h-16 w-full items-center justify-around border-b border-b-zinc-400 p-4">
      <p className="text-3xl text-violet-400 dark:text-white">
        Custom Admin Panel
      </p>
      {/* User info */}
      <div className="relative flex h-full flex-row items-center p-4 ">
        <button
          className="flex items-center justify-between space-x-2"
          onClick={() => {
            setUserContol(!userControl);
          }}
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{user ? user.username : "No User"}</span>
        </button>
        <div
          className={`absolute left-0 top-12 ${
            userControl ? null : "hidden"
          } min-h-16 rounded-lg bg-zinc-300 p-6`}
        >
          <div className="flex flex-col items-center justify-between">
            <div>
              Email - {user?.email} <br />
              Role - {user?.role}
            </div>
            <button
              className="block rounded-sm"
              onClick={() => {
                logout(setUser);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <SwitcherTheme />
    </header>
  );
};
// Logo breadcumps searchbar? profile - logout switcher theme
export default Header;
