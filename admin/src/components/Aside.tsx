import { NavLink } from "react-router-dom";

/*
    there will be list of all links in admin page
    the link should show where user now, by reacthelmet
    sidebar shoud have ability to become smaller
    , and be presented as icons?
    
*/
const Aside = () => {
  return (
    <aside className="min-h-full border-r border-zinc-700 p-4">
      <h2 className="text-center text-lg">Navigation</h2>
      <nav className="flex flex-col items-start  ">
        <ul className="ml-6 divide-y-2 divide-cyan-800 dark:divide-cyan-800">
          <li>
            <NavLink to={"/"}>Main page</NavLink>
          </li>
          <li>
            <NavLink to={"/orders"}>Orders</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
