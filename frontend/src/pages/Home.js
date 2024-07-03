import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">Welcome to Auth App</h1>
        <p className="text-gray-700 mb-8">This is the Home Page. Please sign in to continue.</p>
        <Link to="/sign-in">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Go to Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
