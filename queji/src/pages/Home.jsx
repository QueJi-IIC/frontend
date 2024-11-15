import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from "../components/background";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Background />
      <div className="bg-black p-6 z-50 border rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-5xl font-bold mb-6">QueJI</h1>
        <p className="mb-2">What type of entity are you?</p>
        <div className="space-y-4">
          <Link to="/customer-auth">
            <Button variant="secondary" className="w-full">
              Customer
            </Button>
          </Link>
          <Link to="/business-auth">
            <Button variant="secondary" className="w-full mt-2">
              Business
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
