import axios from "axios";
import React, { useState } from "react";
// import jwtInterceptor from "../../interceptors/axios";

// If user forgot password, and clicks the forgot passowrd btn.
// User will be directed to this forgot password page.
// This is the component for the forgot password page.
export default function Forgot() {
  const [email, setEmail] = useState(""); // Define a state variable "email" and a function to update it
  const [error, setError] = useState(""); // Define a state variable for error messages
  const [successMessage, setSuccessMessage] = useState(""); // Define a state variable for success messages

  // Handle form submission when the user submits their email for password reset
  const handleSubmit = async (event) => {
    event.preventDefault(); // To avoid the reload of the page
    try {
      // Send a POST request to the server to initiate the password reset process
      await axios.post(
        "http://localhost:8000/auth/forgotPassword",
        { email }, // This is the req.body
        {
          headers: { "content-Type": "application/json" },
          // I am indicating to the server that the data in the request body should be treated as JSON formate.
          withCredentials: true,
          // When withCredentials: true is set in Axios request, Axios will include any relevant cookies or credentials in the request headers.
        }
      );
      // Set a success message to inform the user to check their email inbox
      setSuccessMessage("Please check your email inbox!");
      setError(""); // Clear any previous error messages
    } catch (error) {
      // Handle any errors that may occur during the password reset request
      setError(error.response.data);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  // onSubmit is used for form submission and validation and is associated with HTML forms. It is triggered when the user submits the form.
  // onClick is used for handling user interactions with various HTML elements, like buttons and links, and is triggered when the user clicks or activates the element.

  // Since I need to validate email data entered by the user before submitting in to the server.
  return (
    <main className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Forgot password
        </h1>
      </div>

      <form className="mx-auto mt-5 max-w-xl sm:mt-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div className="sm:col-span-2" id="email">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                // This attribute specifies that the input is for an email address.
                // It helps browsers provide built-in email validation, such as checking for the presence of an "@" symbol.
                name="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                // it means that email is updated by the inputted value from user
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Submit
          </button>
          <div className="text-red-600 mt-2">
            {/* If error value is updated, error will be displayed. If successMessage is updated, successMessage will be displayed */}
            {error && error} {successMessage && successMessage}
          </div>
        </div>
      </form>
    </main>
  );
}
