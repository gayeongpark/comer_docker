import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
import jwtInterceptor from "../../interceptors/axios";

export default function Login() {
  // Define and initialize state variables using the useState hook
  const [open, setOpen] = useState(false); // Used to toggle password visibility

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate(); // Get the navigation function for routing

  const dispatch = useDispatch(); // Get the dispatch function for Redux

  const toggle = () => {
    setOpen(!open);
  }; // Function to toggle password visibility, it will update the open into true(not false)

  // Function to handle form submission
  const handleSubmit = async (event) => {
    try {
      event.preventDefault(); // It is to avoid to reload the page
      const params = {
        email,
        password,
      };
      // Send a POST request with user data to the server
      const response = await jwtInterceptor.post("/auth/login", params, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      // Save the response data into user variable
      const user = response.data;
      // console.log(user);
      // Dispatch an action to update the user's authentication status in Redux
      dispatch(setAuthUser(user));
      //coverting setAuthUser(false) into (true)
      // authUser(user);
      //containing user in authUser selector
      navigate("/"); // Redirect the user to the homepage
    } catch (error) {
      setError(error.response.data);
      // Dispatch an action to update the user's authentication status to false in Redux
      dispatch(setAuthUser(false));
    }
  };

  // onSubmit is used for form submission and validation and is associated with HTML forms. It is triggered when the user submits the form.
  // onClick is used for handling user interactions with various HTML elements, like buttons and links, and is triggered when the user clicks or activates the element.

  // Since I need to validate email data entered by the user before submitting in to the server.
  return (
    <main className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Log in
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Explore thousands of experiences and make friends as a member.
        </p>
      </div>

      <form className="mx-auto mt-5 max-w-xl sm:mt-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          {/* Email input */}
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
                name="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="sm:col-span-2" id="password">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="relative mt-2.5">
              <input
                type={open === false ? "password" : "text"}
                name="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassowrd(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
                required
              />
              <div className="text-2xl absolute top-2 right-5 text-gray-300">
                {open === false ? (
                  <BiHide onClick={toggle} />
                ) : (
                  <BiShow className="text-gray-900" onClick={toggle} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Continue
          </button>
          <div className="text-red-600 mt-2">{error && error}</div>
          <Link to="/signup">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mt-8 text-md leading-8 text-gray-600">
                Don't have an Account? <button>Create One</button>
              </p>
            </div>
          </Link>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mt-4 text-md leading-8 text-gray-600">
              <Link to="/forgotPassword">
                <button>Forgot password?</button>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
