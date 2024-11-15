import React from "react";
import { Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import Business from "./pages/Business";
import Home from "./pages/Home";
import ListStores from "./pages/ListStores";
import Login from "./pages/Login";
import MyStores from "./pages/MyStores";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./configs/firebase";
import NewShop from "./pages/NewStore";

const App = () => {
  function Header() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="fixed z-50 top-0 right-0 p-4">
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
}
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-auth" element={<Customer />} />
        <Route path="/business-auth" element={<Business />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stores" element={<ListStores />} />
        <Route path="/stores/my" element={<MyStores />} />
        <Route
            path="/store/new"
            element={
                <NewShop />
            }
          />
      </Routes>
    </>
  );
};

export default App;
