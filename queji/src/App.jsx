import React from "react";
import { Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import Business from "./pages/Business";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-auth" element={<Customer />} />
        <Route path="/business-auth" element={<Business />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
