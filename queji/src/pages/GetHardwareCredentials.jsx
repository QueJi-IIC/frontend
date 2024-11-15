import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import Background from "../components/background";
import { ClipLoader } from "react-spinners";
import { postHardwareData } from "../data/hardware"; // Adjust the import path as needed

const GetHardwareCredentials = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleGetCredentials = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const response = await postHardwareData(id, token);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Background className="absolute inset-0" />
      <Link
        to="/stores/my"
        className="bg-blue-600 relative z-10 mb-2 w-full max-w-md hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Back to My Stores
      </Link>
      <div className="bg-black relative z-10 border p-8 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Get Hardware Credentials
        </h1>
        <button
          onClick={handleGetCredentials}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color={"#ffffff"} loading={true} />
          ) : (
            "Get Credentials"
          )}
        </button>
        {error && (
          <div className="text-red-500 mt-4 text-center">
            <p>{error}</p>
          </div>
        )}
        {data && (
          <div className="text-green-500 mt-4 text-center">
            <p>Credentials received successfully!</p>
            <div className="mt-4">
              <p>Client ID: {data.data.client_id}</p>
              <button
                onClick={() => handleCopy(data.data.client_id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"
              >
                Copy Client ID
              </button>
            </div>
            <div className="mt-4">
              <p>Client Secret: {data.data.client_secret.slice(0, 10)}...</p>
              <button
                onClick={() => handleCopy(data.data.client_secret)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"
              >
                Copy Client Secret
              </button>
              <p className="text-red-500 mt-2">
                Warning: The client secret will not be available again.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetHardwareCredentials;