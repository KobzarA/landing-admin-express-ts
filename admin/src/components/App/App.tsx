import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Aside from "../Aside";
import "./App.css";
import MainPage from "../pages/MainPage";
import OrdersPage from "../pages/OrdersPage";

function App() {
  return (
    <Router>
      <div className="grid grid-cols-[200px_minmax(900px,_1fr)] grid-rows-2">
        <Header />
        <Aside />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
