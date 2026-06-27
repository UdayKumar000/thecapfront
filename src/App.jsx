import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PurchaseEntry from "./pages/PurchaseEntry";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import VendorReport from "./pages/VendorReport";

import "./styles/App.css";

function App() {
  return (
    <>
      <Navbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/purchase-entry"
            element={<PurchaseEntry />}
          />

          <Route
            path="/purchase-success"
            element={<PurchaseSuccess />}
          />

          <Route
            path="/vendor-report"
            element={<VendorReport />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;