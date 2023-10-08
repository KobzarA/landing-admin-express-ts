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
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";

export interface IUser {
  email: string;
  username: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <Router basename="/admin">
      {user ? null : <Navigate to="/login" replace={true} />}
      <Routes>
        <Route
          index
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
