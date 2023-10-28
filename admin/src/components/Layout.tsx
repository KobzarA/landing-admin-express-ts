import Header from "./Header/Header";
import Aside from "./Aside";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-cols-main-layout grid-rows-main-layout">
      <Aside />
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
