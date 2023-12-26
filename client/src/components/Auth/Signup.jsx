import React, { useRef, useState } from "react";
// import jwtInterceptor from "../../interceptors/axios"; // Call the axios interceptor to refresh the access token
import { useForm } from "react-hook-form"; // I used library to validate the form
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from "axios";

// Sign up component for sign up page
export default function Signup() {
  const navigate = useNavigate(); // Get the 'navigate' function from React Router
  const [error, setError] = useState(""); // State variable to store and display error messages
  const [successMessage, setSuccessMessage] = useState(""); // State variable to display success messages
  const [password1Visible, setPassword1Visible] = useState(false); // State variable to toggle password visibility for the password field
  const [password2Visible, setPassword2Visible] = useState(false); // State variable to toggle password visibility for the password confirmation

  // Function to toggle visibility of password
  const togglePassword1 = () => {
    setPassword1Visible(!password1Visible);
  };

  // Function to toggle visibility of password confirmation
  const togglePassword2 = () => {
    setPassword2Visible(!password2Visible);
  };

  // Initialize form validation using 'react-hook-form'
  const {
    register, // Function to register input elements for validation
    watch, // Function to watch input field values
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Object to store validation errors
  } = useForm();

  // Create a reference to watch the 'email' input field
  const emailValidate = useRef();
  emailValidate.current = watch("email");

  // Create a reference to watch the 'password' input field
  const passwordValidate = useRef();
  passwordValidate.current = watch("password");

  // Create a reference to watch the 'password2' input field
  const password2Validate = useRef();
  password2Validate.current = watch("password2");

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Create a user object with form data
    const user = {
      email: data.email,
      password: data.password,
      password2: data.password2,
    };
    // console.log(user);

    try {
      // Send a POST request to the server to sign up the user
      await axios.post("http://localhost:8000/auth/signup", user, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      // Display a success message and navigate to the login page after a delay
      setSuccessMessage(
        "please check out yor email inbox to verify your email!"
      );

      // If this request is success, It will navigate user to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      // Display an error message from the server if the sign-up request fails
      setError(error.response.data.error);
    }
  };

  return (
    <main className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create an Account
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Explore thousands of experiences and make friends as a member.
        </p>
      </div>
      {/* When the form is submitted, the handleSubmit function will trigger the onSubmit  */}
      <form
        className="mx-auto mt-5 max-w-xl sm:mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                {...register("email", {
                  // Use react-hook-form's 'register' function to handle form validation
                  // Define validation rules for the 'email' field
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email" // Set the input type to 'email' to enable email input validation by the browser
                name="email"
                id="email"
                autoComplete="off"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
              />
              {/* If there is error on email, error message on email will be displayed */}
              {errors.email && errors.email.type === "required" && (
                <div>* Email is required</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-2" id="password">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="relative mt-2.5">
              <input
                {...register("password", {
                  // Use react-hook-form's 'register' function to handle form validation
                  // Define validation rules for the 'password' field
                  required: true, // Make the password field required
                  minLength: 6, // Specify a minimum length of 6 characters for the password.
                })}
                type={password1Visible === false ? "password" : "text"}
                // Toggle the input type based on the visibility of the password.
                // If password1Visible is false, set the type to "password" (hidden).
                // If password1Visible is true, set the type to "text" (visible).
                name="password" // Specify the input field name, which will be sent with the form data
                id="password" // Assign an 'id' to the input field for easy access in the DOM or for labels
                autoComplete="false" // Set autoComplete attribute to "false" to disable browser auto-completion for this field.
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
              />
              <div className="text-2xl absolute top-2 right-5 text-gray-300">
                {password1Visible === false ? (
                  // Check if the password1Visible variable is false (password is hidden).
                  <BiHide onClick={togglePassword1} />
                ) : (
                  // If the password is hidden, display the 'BiHide' icon to toggle visibility.
                  // If the password is visible, display the 'BiShow' icon to toggle visibility.
                  <BiShow className="text-gray-900" onClick={togglePassword1} />
                  // Apply the 'text-gray-900' class to the 'BiShow' icon for styling.
                )}
              </div>
              {errors.password && errors.password.type === "required" && (
                <div>* Password is required</div>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <div>* Password should contain at least 6 characters</div>
              )}
            </div>
          </div>
          <div className="sm:col-span-2" id="password2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Password confirmation
            </label>
            <div className="relative mt-2.5">
              <input
                {...register("password2", {
                  required: true,
                  validate: (value) => value === passwordValidate.current,
                })}
                type={password2Visible === false ? "password" : "text"}
                name="password2"
                id="password2"
                autoComplete="false"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700"
              />
              <div className="text-2xl absolute top-2 right-5 text-gray-300">
                {password2Visible === false ? (
                  <BiHide onClick={togglePassword2} />
                ) : (
                  <BiShow className="text-gray-900" onClick={togglePassword2} />
                )}
              </div>
              {errors.password2 && errors.password2.type === "required" && (
                <div>* Confirmed password is required</div>
              )}
              {errors.password2 && errors.password2.type === "validate" && (
                <div>* Password does not match with password confirmation</div>
              )}
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
          {/* If there is error message, the error message will be displayed */}
          <div className="text-red-600 mt-2">{error && error}</div>
          {/* If there is success message, the success message will be displayed */}
          <div className="text-red-600 mt-2">
            {successMessage && successMessage}
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mt-8 text-md leading-8 text-gray-600">
              Alreay have an account?{" "}
              <Link to="/login">
                <button>Log in</button>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
