import React from "react";
import { Link } from "react-router-dom";

// This is the skeleton component for the profile
export default function ProfileSK() {
  return (
    <div className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
      <div className="px-4 py-6">
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          <Link to="/">Home</Link> &#60; Personal info
        </p>
        <h3 className="mt-10 mb-5 text-3xl font-semibold leading-6 text-gray-900">
          Person info
        </h3>
      </div>
      <div className="w-2/3">
        <dl>
          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Profile image</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="animate-pulse bg-gray-400 inline-block h-36 w-36 mb-2 overflow-hidden rounded-full"></span>
            </dd>
          </div>
          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Short introduction
            </dt>

            <dd className="animate-pulse bg-gray-400 rounded mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Legal name</dt>

            <dd className="animate-pulse bg-gray-400 rounded mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
          </div>

          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>

            <dd className="animate-pulse bg-gray-400 rounded mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>

            <dd className="animate-pulse bg-gray-400 rounded mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>

            <dd className="animate-pulse bg-gray-400 rounded mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="flex px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 cursor-pointer">
            Do you want to delete your account?
          </div>
        </dl>
      </div>
    </div>
  );
}
