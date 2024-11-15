import React, { useState ,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Background from "../components/background";
import { addToQueue } from "../data/queue";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../configs/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

const JoinQueue = () => {

  
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
      )
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(()=>{getLocation();},[])


  const navigate = useNavigate();
  const { id: store_id } = useParams();
  const [user] = useAuthState(auth);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch the store details using the store_id
  const storeRef = doc(firestore, "stores", store_id);
  const [storeDoc, storeLoading, storeError] = useDocument(storeRef);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addToQueue(user.uid, user.displayName, store_id, storeDoc.data().name);
      setSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error("Error joining queue: ", error);
      if (error === "User is already in the queue for this store") {
        setErrors({ submit: error });
      } else {
        setErrors({ submit: "Failed to join queue. Please try again." });
      }
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  if (storeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <ClipLoader size={50} color={"#ffffff"} loading={true} />
      </div>
    );
  }

  if (storeError || !storeDoc.exists()) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Error loading store details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Background className="absolute inset-0 z-0" />
      <Link
        to="/stores"
        className="bg-blue-600 relative z-10 mb-4 w-full max-w-md hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Back to All Stores
      </Link>
      <div className="relative z-10 border bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Join Virtual Queue
        </h2>
        <p className="text-center mb-4">Store: {storeDoc.data().name}</p>
        <button
          onClick={handleSubmit}
          className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color={"#ffffff"} loading={true} />
          ) : (
            "Enter the waitlist"
          )}
        </button>
        {submitted && (
          <div className="text-green-500 mt-4 text-center">
            Successfully joined the queue. You will receive an email soon!
          </div>
        )}
        {errors.submit && (
          <div className="text-red-500 mt-4 text-center">{errors.submit}</div>
        )}
      </div>
    </div>
  );
};

export default JoinQueue;