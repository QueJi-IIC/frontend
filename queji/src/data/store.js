import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../configs/firebase";

const getStoreData = (
  capacity,
  tracking_object,
  name,
  desc,
  created_by,
  area,
  latitude,
  longitude
) => {
  return {
    capacity,
    tracking_object_type: tracking_object,
    name,
    desc,
    created_by,
    area,
    latitude,
    longitude
  };
};

const tracking_objects = ["Person", "Car"];

const addStore = async (
  setError,
  capacity,
  tracking_object,
  name,
  desc,
  created_by,
  area,
  latitude,
  longitude
) => {
  try {
    // Create a new document reference with an auto-generated ID
    const newStoreRef = doc(collection(firestore, "stores"));

    // Set the document data
    await setDoc(
      newStoreRef,
      getStoreData(capacity, tracking_object, name, desc, created_by, area , latitude , longitude)
    );

    // Optionally, you can clear the error if the operation is successful
    setError(null);
  } catch (error) {
    // Handle any errors that occur during the Firestore operation
    console.error("Error adding store: ", error);
    setError("Failed to add store. Please try again.");
    throw new Error("Error adding store");
  }
};

export { addStore };
