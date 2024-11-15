import React, { useState } from "react";
import Background from "../components/background";
import { addStore } from "../data/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const trackingObjects = ["Person", "Car"]; // Example tracking objects

const NewShop = () => {
  const [formData, setFormData] = useState({
    capacity: "",
    tracking_object: "",
    name: "",
    desc: "",
    created_by: "",
    area: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.capacity) newErrors.capacity = "Capacity is required";
    if (!formData.tracking_object) newErrors.tracking_object = "Tracking object is required";
    if (!formData.name) newErrors.name = "Shop name is required";
    if (!formData.desc) newErrors.desc = "Description is required";
    if (!formData.area) newErrors.area = "Area is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await addStore(setError, formData.capacity, formData.tracking_object, formData.name, formData.desc, user.uid, formData.area);
      setFormData({
        capacity: "",
        tracking_object: "",
        name: "",
        desc: "",
        created_by: "",
        area: "",
      });
      setSubmitted(true);
      setError({});
    } catch (error) {
      console.error("Error adding store: ", error);
      setError({ submit: "Failed to add store. Please try again." });
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Background className="absolute inset-0 z-0" />
      <Link
        to="/stores/my"
        className="bg-blue-600 relative z-10 mb-2 w-full max-w-md hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Back to My Stores
      </Link>
      <div className="relative border z-10 bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Enter Shop Details
        </h2>
        {submitted && (
          <div className="text-green-500 mb-4 text-center">
            Store added successfully!
          </div>
        )}
        {error.submit && (
          <div className="text-red-500 mb-4 text-center">{error.submit}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            {error.capacity && (
              <p className="text-red-500 text-sm">{error.capacity}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tracking Object
            </label>
            <select
              name="tracking_object"
              value={formData.tracking_object}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            >
              <option value="">Select a tracking object</option>
              {trackingObjects.map((object) => (
                <option key={object} value={object}>
                  {object}
                </option>
              ))}
            </select>
            {error.tracking_object && (
              <p className="text-red-500 text-sm">{error.tracking_object}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            {error.desc && <p className="text-red-500 text-sm">{error.desc}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Area (in sq meters)
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            {error.area && <p className="text-red-500 text-sm">{error.area}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color={"#ffffff"} loading={true} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewShop;