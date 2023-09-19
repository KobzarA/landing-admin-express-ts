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
        <ul className="ml-6 space-y-3 divide-y-2 divide-cyan-800 dark:divide-cyan-800">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-cyan-300"
                  : isActive
                  ? "text-cyan-500"
                  : " hover:text-cyan-300"
              }
            >
              Main page
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/orders"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-cyan-300"
                  : isActive
                  ? "text-cyan-500"
                  : "hover:text-cyan-300"
              }
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
