import axios from "axios";
import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import jwtInterceptor from "../../interceptors/axios"; // Call the intercetor to refresh the access token

export default function Reset() {
  const navigate = useNavigate(); // Call useNavigation
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { token } = useParams(); // Get the 'token' parameter from the URL
  const [password1Visible, setPassword1Visible] = useState(false); // Toggle visibility of the password input
  const [password2Visible, setPassword2Visible] = useState(false); // Toggle visibility of the password confirmation input

  // Function to toggle visibility of the password input
  // It will convert the value from false to true
  const togglePassword1 = () => {
    setPassword1Visible(!password1Visible);
  };

  // Function to toggle visibility of the password confirmation input
  // It will convert the value from false to true
  const togglePassword2 = () => {
    setPassword2Visible(!password2Visible);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // It is to avoid the reload of the page
    // response object is created.
    const response = {
      token,
      password,
      password2,
    };
    try {
      // Send a POST request with password reset object data
      await axios.post(
        "http://localhost:8000/auth/resetPassword",
        response,
        {
          headers: { "content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Display a success message and navigate to the login page after a delay
      setSuccessMessage(
        "The password has been successfully reset. Please hold on..."
      );
      // Reset the error message
      setError("");
      // If this request is success, It will navigate user to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Display an error message from the server if the password reset request fails
      setError(error.response.data);
      // Reset the success message
      setSuccessMessage("");
    }
  };

  // onSubmit is used for form submission and validation and is associated with HTML forms. It is triggered when the user submits the form.
  // onClick is used for handling user interactions with various HTML elements, like buttons and links, and is triggered when the user clicks or activates the element.
  // Since I need to validate email data entered by the user before submitting in to the server.

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Reset password
        </h1>
      </div>

      {/* When the form is submitted, handleSubmit will be called */}
      <form className="mx-auto mt-5 max-w-xl sm:mt-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div className="sm:col-span-2" id="password">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="relative mt-2.5">
              <input
                // If password1Visible is false, type will be password(invisible). If password1Visible is true, type will be text(visible)
                type={password1Visible === false ? "password" : "text"}
                name="password"
                id="password"
                autoComplete="off"
                // Updating the password value
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                required
              />
              <div className="text-2xl absolute top-2 right-5 text-gray-300">
                {password1Visible === false ? (
                  <BiHide onClick={togglePassword1} />
                ) : (
                  <BiShow className="text-gray-900" onClick={togglePassword1} />
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2" id="password2">
            <label
              // htmlFor specifies which input element the label is associated with by matching the htmlFor value to the id of the input element
              htmlFor="password2"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password Confirmation
            </label>
            <div className="relative mt-2.5">
              <input
                // If password1Visible is false, type will be password(invisible). If password1Visible is true, type will be text(visible)
                type={password2Visible === false ? "password" : "text"}
                name="password2"
                id="password2"
                // I want to turn off the auto-completion
                autoComplete="off"
                // Updating the password2 value
                onChange={(e) => setPassword2(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                // Specify that the input field must be filled out by the user before they can submit the form.
                required
              />
              <div className="text-2xl absolute top-2 right-5 text-gray-300">
                {password2Visible === false ? (
                  <BiHide onClick={togglePassword2} />
                ) : (
                  <BiShow className="text-gray-900" onClick={togglePassword2} />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Display error message to let user know the status */}
        <div className="text-red-600 mt-2">{error && error}</div>
        {/* Display success message to let user know the status */}
        <div className="text-red-600 mt-2">
          {successMessage && successMessage}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
