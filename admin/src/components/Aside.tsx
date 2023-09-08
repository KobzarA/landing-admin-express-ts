import { NavLink } from "react-router-dom";

/*
    there will be list of all links in admin page
    the link should show where user now, by reacthelmet
    sidebar shoud have ability to become smaller
    , and be presented as icons?
    
*/
const Aside = () => {
  return (
    <aside>
      <nav>
        <NavLink to={"/"}>Main page</NavLink>
        <NavLink to={"/orders"}>Orders</NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
