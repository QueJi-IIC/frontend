import { collection, doc, setDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../configs/firebase";

const getQueueData = (user_id, user_name, store_id, store_name, created_at) => {
  return {
    user_id,
    user_name,
    store_id,
    store_name,
    created_at,
  };
};

const addToQueue = async (user_id, user_name, store_id, store_name) => {
  try {
    // Check if the user is already in the queue for the same store
    const queueQuery = query(
      collection(firestore, "queue"),
      where("user_id", "==", user_id),
      where("store_id", "==", store_id)
    );
    const querySnapshot = await getDocs(queueQuery);

    if (!querySnapshot.empty) {
      throw new Error("User is already in the queue for this store");
    }

    // Create a new document reference with an auto-generated ID
    const newQueueRef = doc(collection(firestore, "queue"));

    // Get the current timestamp
    const created_at = serverTimestamp();

    // Set the document data
    await setDoc(
      newQueueRef,
      getQueueData(user_id, user_name, store_id, store_name, created_at)
    );

    console.log("User added to queue successfully");
  } catch (error) {
    console.error("Error adding user to queue: ", error);
    if (error.message === "User is already in the queue for this store") {
      throw new Error("User is already in the queue for this store");
    } else {
      throw new Error("Error adding user to queue");
    }
  }
};

export { addToQueue };