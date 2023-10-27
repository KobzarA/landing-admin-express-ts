import { Dispatch, SetStateAction } from "react";

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
    <div className="grid-cols-main-layout grid-rows-main-layout grid">
      <Aside />
      <Header user={user} setUser={setUser} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
