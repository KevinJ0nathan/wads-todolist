import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">

      <div className="absolute top-4 right-4 space-x-4">
        <Link to="/Login">
        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Login
        </button>
        </Link>
        <Link to="/Register">
        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Sign Up
        </button>
        </Link>
      </div>

      <h1 className="typing font-bold text-6xl leading-[1.2] pb-2">
        ToDoApp...
      </h1>
      <h2 className="text-xl text-gray-600 animate-fadeIn">Because sticky notes just aren’t enough!</h2>
    </div>
  );
};

export default HomePage;
