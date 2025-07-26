import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeArena</h1>
      <p className="text-lg text-gray-600 mb-8">
        Practice coding problems and participate in live contests.
      </p>
      <div className="flex justify-center gap-6">
        <Link to="/problem" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Solve Problems
        </Link>
        <Link to="/contests" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Join Contests
        </Link>
      </div>
    </div>
  );
};

export default Home;
