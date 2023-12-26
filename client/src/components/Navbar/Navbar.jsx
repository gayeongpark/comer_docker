import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  // BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";

// Utility function to handle CSS classes
// The classNames function is used in the code I provided to generate a string of CSS class names for an element, allowing me to conditionally apply classes based on certain conditions.
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const navigate = useNavigate(); // Get the navigation function for routing
  const dispatch = useDispatch();

  // Get the authenticated user information from Redux state
  const authUser = useSelector((state) => state.authUser.value);

  // Function to handle user logout
  const logout = async () => {
    try {
      // Send a logout request to the server
      const loggedOut = await axios.post("/auth/logout", {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      if (loggedOut) {
        // Update the Redux state to indicate the user is no longer authenticated
        dispatch(setAuthUser(loggedOut));
        // Redirect the user to the login page
        navigate("/login");;
      }
    } catch (error) {
      // If logout fails, update the Redux state accordingly
      dispatch(setAuthUser(false));
    }
  };

  return (
    <nav role="navigation">
      {/* semantic tag of Navigation */}
      <div className="min-h-full">
        <Disclosure as="nav" className="relative bg-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <h1>Comer</h1>
                      </Link>
                    </div>
                    {/* <div className="hidden md:block"></div> */}
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6 space-x-4">
                      <Link to="/hostingExperience">
                        <button
                          type="button"
                          className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Open experience
                        </button>
                      </Link>
                      {/* <button
                        type="button"
                        className="rounded-full p-1 text-red-400 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        {/* If there is not authUser.profilePicture, I want to display just the default picture */}
                        {!authUser.profilePicture && (
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://www.donut.app/assets/donut.png"
                                alt="profileImage"
                              />
                            </Menu.Button>
                          </div>
                        )}
                        {/* If there is a saved authUser.profilePicture, I want to display just the saved picture */}
                        {authUser.profilePicture && (
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`${authUser.profilePicture}`}
                                alt="Update profileImage"
                              />
                            </Menu.Button>
                          </div>
                        )}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {!authUser && (
                              <Link to="/login">
                                <Menu.Item>
                                  {({ active }) => (
                                    // The active parameter tells whether this menu item is currently active or selected.
                                    <div
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                      // The className attribute is assigned the result of the classNames function.
                                      // This function is used to conditionally build a string of class names for the div element.
                                      // If the active parameter is true, it adds the class "bg-gray-100" to the element's classes; otherwise, it adds an empty string ("").
                                      // This is how the active menu item gets a different background color ("bg-gray-100").
                                    >
                                      Log in
                                    </div>
                                  )}
                                </Menu.Item>
                              </Link>
                            )}

                            {authUser && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Welcome {authUser.email}!
                                  </div>
                                )}
                              </Menu.Item>
                            )}

                            {/* {authUser && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    // onClick={logout}
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Message
                                  </div>
                                )}
                              </Menu.Item>
                            )} */}
                            {authUser && (
                              <Link to={`/myExperience/${authUser?.id}`}>
                                {/* When this button is clicked, I want to locate user to this URL page */}
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Your experineces
                                    </div>
                                  )}
                                </Menu.Item>
                              </Link>
                            )}
                            {authUser && (
                              <Link to={`/bookedExperience/${authUser?.id}`}>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Booked experiences
                                    </div>
                                  )}
                                </Menu.Item>
                              </Link>
                            )}
                            {authUser && (
                              <Link to={`/yourProfile/${authUser?.id}`}>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Your profile
                                    </div>
                                  )}
                                </Menu.Item>
                              </Link>
                            )}
                            {authUser && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    // If this btn is clicked, logout function will be executed
                                    onClick={logout}
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Log out
                                  </div>
                                )}
                              </Menu.Item>
                            )}
                            {/* <Menu.Item>
                              {({ active }) => (
                                <div
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Language
                                </div>
                              )}
                            </Menu.Item> */}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  {/* Mobile menu button */}
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {/* if open is true, I want to display Xicon. If it is false, I want to display hamburger icon. */}
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3"></div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {!authUser.profilePicture && (
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://www.donut.app/assets/donut.png"
                          alt="profileImage"
                        />
                      )}

                      {authUser.profilePicture && (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`${authUser.profilePicture}`}
                          alt="Update profileImage"
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      {authUser && (
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {authUser.email}
                        </div>
                      )}
                    </div>
                    {/* <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {!authUser && (
                      <Link to={"/login"}>
                        <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          Log in
                        </Disclosure.Button>
                      </Link>
                    )}
                    {authUser && (
                      <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        Open experience
                      </Disclosure.Button>
                    )}
                    {authUser && (
                      <Link to={`/yourProfile/${authUser?.id}`}>
                        <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          Your profile
                        </Disclosure.Button>
                      </Link>
                    )}
                    {authUser && (
                      <Link to={`/myExperience/${authUser?.id}`}>
                        <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          Your experience
                        </Disclosure.Button>
                      </Link>
                    )}
                    {authUser && (
                      <Link to={`/BookedExperience/${authUser?.id}`}>
                        <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          Booked experience
                        </Disclosure.Button>
                      </Link>
                    )}
                    {authUser && (
                      <Disclosure.Button
                        onClick={logout}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        Log out
                      </Disclosure.Button>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </nav>
  );
}
