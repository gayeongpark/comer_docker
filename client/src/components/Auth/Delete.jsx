import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
import { useNavigate } from "react-router";
import jwtInterceptor from "../../interceptors/axios";

// Delete component
export default function Delete() {
  const [message, setMessage] = useState(""); // Define a state variable "message" and a function to update it
  const [error, setError] = useState("");
  const authUser = useSelector((state) => state.authUser.value); // Use useSelector to get the "authUser" data (stored user data value) from Redux state
  // console.log(authUser);

  const dispatch = useDispatch(); // Get the dispatch function to dispatch actions
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await jwtInterceptor.delete(
        `/users/delete/${authUser.id}`
      );
      setMessage(response.data.message); // Update the "message" state with the response data
      dispatch(setAuthUser(response)); // Dispatch an action to update the authenticated user in Redux state
      setTimeout(() => {
        navigate("/signup");
      }, 3000); // User will be redirected after 3 seconds
      // window.location.href is used for full page navigation, while useNavigation is used for client-side navigation within a single-page application to change the content without fully reloading the page.
      // The reason I choose to use full page navigation is that I need to reset the state and make user logged out.
    } catch (error) {
      setError(error.response.data.error); // update error to display the server's error message
    }
  };

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Delete your account?
        </h1>
        <p className="mt-7 text-lx text-red leading-8 text-gray-600">
          {error && error}
          {/* If there is error, error message will be displayed */}
          {message && message}
          {/* If there is success message, the message will be displayed */}
        </p>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-8 w-full justify-center text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            Delete
          </button>
          {/* It user click the Delete btn, handleSubmit function will be called */}
          <button
            type="button"
            onClick={() => navigate("/")} // Directly use navigate to navigate to the main page
            className="mt-8 w-full justify-center text-gray-700 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
