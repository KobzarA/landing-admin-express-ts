// import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import MainPage from "./pages/MainPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/auth/LoginPage";
import { useEffect } from "react";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import UsersCreatePage from "./pages/UsersCreatePage";
import VerifyUser from "./pages/auth/VerifyUser";
import { useSelector } from "react-redux";
import { RootState } from "./../store";

function App() {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //use prefered theme

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router basename="/admin">
      {loading === "failed" ? (
        <Navigate to="/login/" replace={true} />
      ) : user ? null : (
        <Navigate to="/login/verify" replace={true} />
      )}
      <Routes>
        <Route index path="/login" element={<LoginPage />} />
        <Route path="/login/verify" element={<VerifyUser />} />
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />}></Route>
          <Route path="/users/create" element={<UsersCreatePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
