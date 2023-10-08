import { ReactElement, Dispatch, SetStateAction } from "react";

import Header from "./Header/Header";
import Aside from "./Aside";
import { Outlet } from "react-router-dom";
import { IUser } from "./App";

// const Layout = ({ children }: { children: ReactElement | ReactElement[] }) => {
const Layout = ({
  user,
  setUser,
}: {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<null | IUser>>;
}) => {
  return (
    <div className=" max-h-full min-h-screen">
      <Header user={user} setUser={setUser} />
      <div className="flex min-h-full">
        <Aside />
        <main className="min-h-full border-l border-zinc-700 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
