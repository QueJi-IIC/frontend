import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from "../components/background";

const Customer = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Background />
      <div className="bg-black p-6 z-50 border rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-5xl font-bold mb-6">Customer</h1>
        <div className="space-y-4 gap-2">
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              Sign Up
            </Button>
          </Link>
          <Link to="/login" className="mt-2">
            <Button variant="secondary" className="w-full mt-2 ">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customer;
