import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

// This is the navigation component of the login, signup and forgotpassword and resetpassword pages.
export default function AuthNav() {
  return (
    <nav className="flex justify-between h-14 min-h-full border-b-2 px-1 sm:px-6 lg:px-8">
      <div className="flex items-center">
        {/* This Link means that it goes to back page */}
        <Link to="..">
          <button>
            <BsArrowLeft className="text-lg" />
          </button>
        </Link>
      </div>
      <div className="flex items-center">
        {/* It goes to the main page */}
        <Link to="/">
          <h1 className="">Comer</h1>
        </Link>
      </div>
      <div></div>
    </nav>
  );
}
