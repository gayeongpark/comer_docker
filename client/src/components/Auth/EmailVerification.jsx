import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import jwtInterceptor from "../../interceptors/axios";
import axios from "axios";

// This is the component that will be executed, when user verified the email clicking the provided url
export default function EmailVerification() {
  // Extract the "token" from the URL parameters using the "useParams" hook
  const { token } = useParams();

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Use the "useEffect" hook to fetch email verification data when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch email verification data
    const fetchEmailVerifiedData = async () => {
      try {
        // Send a GET request to the server to verify the email with the provided token
        const emailVerifiedData = await axios.get(
          `http://localhost:8000/auth/verifyEmail/${token}`,
          {
            headers: { "content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // Extract the verified user data from the response
        const verifiedUserData = emailVerifiedData.data;
        // Dispatch the verified user data to the Redux store for state management
        dispatch(verifiedUserData);
      } catch (error) {}
    };
    // Call the "fetchEmailVerifiedData" function when the component mounts
    fetchEmailVerifiedData();
  }, [token, dispatch]);
  // [token, dispatch] is an array of dependencies that tells the useEffect hook to re-run the effect whenever the token value changes (typically due to a change in URL parameters) or if the dispatch function changes (although this is less likely to change in practice).
  // This ensures that the effect is executed with the latest values of these dependencies when necessary.

  return (
    <main className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Email verified
        </h1>
        <p className="mt-7 text-lg leading-8 text-gray-600">
          You email is verified! Explore our experiences and diverse cultures
          making friends.
        </p>
        <div>
          {/* It makes user redirect to the login page */}
          <Link to="/login">
            <button
              type="button"
              className="mt-8 w-full justify-center text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
