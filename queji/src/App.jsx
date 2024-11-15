import React from "react";
import { Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import Business from "./pages/Business";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/customer-auth" element={<Customer />} />
        <Route path="/business-auth" element={<Business />} />
      </Routes>
    </>
  );
};

export default App;
