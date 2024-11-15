import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import Business from "./pages/Business";
import Home from "./pages/Home";
import ListStores from "./pages/ListStores";
import Login from "./pages/Login";
import MyStores from "./pages/MyStores";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./configs/firebase";
import NewShop from "./pages/NewStore";
import { ClipLoader } from "react-spinners";
import JoinQueue from "./pages/JoinQueue";
import StoreConsole from "./pages/StoreConsole";
import GetHardwareCredentials from "./pages/GetHardwareCredentials";
import { signOut } from "firebase/auth";

const App = () => {
  function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <ClipLoader size={50} color={"#ffffff"} loading={true} />
      </div>
    );
  }

  function PrivateRoute({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
      // Show a loading indicator
      return <Loading />;
    }

    if (!user) {
      // Redirect to login if not authenticated
      return <Navigate to="/" />;
    }

    // Render the protected component
    return children;
  }

  function PublicRoute({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
      // Show a loading indicator
      return <Loading />;
    }

    if (user) {
      // Redirect to store if already authenticated
      return <Navigate to="/stores" />;
    }

    // Render the public component
    return children;
  }

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
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/customer-auth"
          element={
            <PublicRoute>
              <Customer />
            </PublicRoute>
          }
        />
        <Route
          path="/business-auth"
          element={
            <PublicRoute>
              <Business />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Private routes */}
        <Route
          path="/stores"
          element={
            <PrivateRoute>
              <ListStores />
            </PrivateRoute>
          }
        />
        <Route
          path="/stores/my"
          element={
            <PrivateRoute>
              <MyStores />
            </PrivateRoute>
          }
        />
        <Route
          path="/store/new"
          element={
            <PrivateRoute>
              <NewShop />
            </PrivateRoute>
          }
        />
        <Route
          path="/store/queue/:id"
          element={
            <PrivateRoute>
              <JoinQueue />
            </PrivateRoute>
          }
        />
        <Route
          path="/store/:id"
          element={
            <PrivateRoute>
              <StoreConsole />
            </PrivateRoute>
          }
        />
        <Route
          path="/hardware/add/:id"
          element={
            <PrivateRoute>
              <GetHardwareCredentials />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
