import React from "react";
import { Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import Business from "./pages/Business";
import Home from "./pages/Home";
import ListStores from "./pages/ListStores";
import Login from "./pages/Login";
import MyStores from "./pages/MyStores";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-auth" element={<Customer />} />
        <Route path="/business-auth" element={<Business />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stores" element={<ListStores />} />
        <Route path="/stores/my" element={<MyStores />} />
      </Routes>
    </>
  );
};

export default App;
