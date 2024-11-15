import React, { useState } from "react";
import Background from "../components/background";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../configs/firebase";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const MyStores = () => {
  const [user] = useAuthState(auth);
  const [locality, setLocality] = useState("Jaipur");
  const [showSelect, setShowSelect] = useState(false);

  const cities = [
    "Jaipur",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
  ];

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
    setShowSelect(false);
  };

  const userStoresQuery = query(
    collection(firestore, "stores"),
    where("created_by", "==", user?.uid)
  );

  const [value, loading, error] = useCollection(userStoresQuery);

  const handleDelete = async (storeId) => {
    try {
      await deleteDoc(doc(firestore, "stores", storeId));
      console.log("Store deleted successfully");
    } catch (error) {
      console.error("Error deleting store: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <Background />
      <div className="bg-black relative z-10 p-6 rounded-lg shadow-lg w-fit mx-auto mt-6 flex items-center justify-start">
        <h1 className="text-4xl font-bold">Current Locality:</h1>
        {showSelect ? (
          <select
            value={locality}
            onChange={handleLocalityChange}
            className="bg-blue-600 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        ) : (
          <button
            className="bg-blue-600 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowSelect(true)}
          >
            {locality}
          </button>
        )}
        <Link
          to="/stores"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          All Stores
        </Link>
        <Link
          to="/store/new"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          New Store
        </Link>
      </div>
      <div className="mt-6 relative z-10 text-center">
        <h1 className="text-4xl font-bold">My Stores</h1>
      </div>
      <div className="mt-6 relative z-10 w-full max-w-4xl">
        {loading && (
          <div className="flex items-center justify-center">
            <ClipLoader size={50} color={"#ffffff"} loading={true} />
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center">
            <p>Error loading stores: {error.message}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {value.docs.map((doc) => (
              <div
                key={doc.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <h2 className="text-xl font-bold text-white">
                  {doc.data().name}
                </h2>
                <p className="text-white">{doc.data().desc}</p>
                <Link
                  to={`/store/${doc.id}`}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
                >
                  View Store Console
                </Link>
                <Link
                  to={`/hardware/add/${doc.id}`}
                  className="mt-2 w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded block text-center"
                >
                  Get Credentials
                </Link>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Store
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStores;