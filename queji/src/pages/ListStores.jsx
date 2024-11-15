import React, { useEffect, useState } from "react";
import Background from "../components/background";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../configs/firebase";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import axios from "axios";

const ListStores = () => {

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState(null);

  const getLocation = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setLocationError(err.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(()=>{getLocation();},[])

  const fetchDistanceMatrix = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/distance-matrix",
        {
          origins: [[location.longitude, location.latitude]], 
          destinations: [[74.006, 40.7128]],
        }
      );
      console.log("Distance Matrix:", response.data);
    } catch (error) {
      console.error("Error fetching distance matrix:", locationError);
    }
  };

  //   fetchDistanceMatrix();


  const [value, loading, error] = useCollection(collection(firestore, "stores"));
  const [isEditing, setIsEditing] = useState(false);
  const [locality, setLocality] = useState("Jaipur");

  const cities = ["Jaipur", "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"];

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <Background />
      <div className="bg-black relative z-10 p-6 rounded-lg shadow-lg w-fit mx-auto mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">Current Locality:</h1>
          {isEditing ? (
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
              onClick={() => setIsEditing(true)}
            >
              {locality}
            </button>
          )}
        </div>
        <Link
          to="/stores/my"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          My Stores
        </Link>
      </div>
      <div className="mt-6 relative z-10 text-center">
        <h1 className="text-4xl font-bold">All Stores</h1>
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
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-bold text-white">
                  {doc.data().name}
                </h2>
                <p className="text-white">{doc.data().desc}</p>
                <Link
                  to={`/store/queue/${doc.id}`}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
                >
                  Join Queue
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListStores;