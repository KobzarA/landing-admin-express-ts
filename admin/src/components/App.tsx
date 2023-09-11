import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Aside from "./Aside";
import MainPage from "./pages/MainPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <Router>
      <div className="h-0 min-h-screen">
        <Header />
        <div className="flex min-h-full">
          <Aside />
          <main className="min-h-full p-4">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
