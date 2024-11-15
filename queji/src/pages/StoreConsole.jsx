import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Background from "../components/background";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, query, where, doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "../configs/firebase";
import { ClipLoader } from "react-spinners";
import { useAuthState } from "react-firebase-hooks/auth";

const StoreConsole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // Fetch the store details
  const storeRef = doc(firestore, "stores", id);
  const [storeDoc, storeLoading, storeError] = useDocument(storeRef);

  // Fetch the queue for the store
  const queueQuery = query(
    collection(firestore, "queue"),
    where("store_id", "==", id)
  );
  const [queueValue, queueLoading, queueError] = useCollection(queueQuery);

  useEffect(() => {
    if (!storeLoading && storeDoc && storeDoc.exists()) {
      if (storeDoc.data().created_by !== user?.uid) {
        navigate("/stores/my");
      }
    }
  }, [storeLoading, storeDoc, user, navigate]);

  const statusRef = doc(firestore, "status", id);
  const [statusDoc, statusLoading, statusError] = useDocument(statusRef);

  const handleDelete = async (queueId) => {
    try {
      await deleteDoc(doc(firestore, "queue", queueId));
      console.log("User removed from queue successfully");
    } catch (error) {
      console.error("Error removing user from queue: ", error);
    }
  };

  if (storeLoading || queueLoading || statusLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <ClipLoader size={50} color={"#ffffff"} loading={true} />
      </div>
    );
  }

  if (storeError || queueError || statusError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Error loading data: {storeError?.message || queueError?.message}</p>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold mb-2 text-center">
          Store: {storeDoc.data().name}
        </h1>
        <h2 className="text-2xl font-bold text-center">
          People in virtual queue: {queueValue?.docs.length}
        </h2>
        <h2 className="text-2xl font-bold text-center">
          {statusDoc && statusDoc?.exists()
            ? `People in store: ${
                statusDoc?.data().status.People
              }, last updated at ${new Date(statusDoc?.data().timestamp)}`
            : "No data available for people in store"}
        </h2>
      </div>
      <div className="bg-black relative z-10 border p-8 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Queue List</h1>
        <ol className="list-decimal list-inside text-white space-y-2">
          {queueValue.docs.map((doc, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex justify-between items-center"
            >
              <span>{doc.data().user_name}</span>
              <button
                onClick={() => handleDelete(doc.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default StoreConsole;