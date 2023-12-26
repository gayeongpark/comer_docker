import React, { useEffect, useState } from "react";
import jwtInterceptor from "../../interceptors/axios"; // Import Axios instance with JWT interceptor
import { BsHeartFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Products() {
  // Define a state variable "newProductData" and its updater function "setNewProductData"
  const [newProductData, setNewProductData] = useState([]);

  // Function to handle sliding images left or right
  // It takes two parameters direction and index
  // direction is a string that specifies the direction of the slid(l: left, r: right)
  // idx is to indentify specific picture
  const handleMove = (direction, idx) => {
    let newSlideNumber; // Store the updated slide number.
    const updateState = [...newProductData]; // Create a shallow copy of an array or object called newProductData in order to make modifications to the data without directly mutating the original data

    if (direction === "l") {
      // If left direction is requested
      // If direction is "l" (left), it checks if the current slide number for the product at index idx is 0.
      // If it is, it sets the newSlideNumber to the last index of the product's files array; otherwise, it decrements the slide number by 1
      // slideNumber is index of its pictures
      newSlideNumber =
        newProductData[idx].slideNumber === 0
          ? newProductData[idx].files.length - 1
          : newProductData[idx].slideNumber - 1;
    } else if (direction === "r") {
      // If right direction is requested
      // If direction is "r" (right), it checks if the current slide number for the product at index idx is the last index of the product's files array.
      // If it is, it sets the newSlideNumber to 0; otherwise, it increments the slide number by 1.
      newSlideNumber =
        newProductData[idx].slideNumber === newProductData[idx].files.length - 1
          ? 0
          : newProductData[idx].slideNumber + 1;
    }

    updateState[idx].slideNumber = newSlideNumber; // Update the slide number for a specific product
    setNewProductData(updateState); // Update the state with the modified data
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // GET request to fetch product data from the server
        const response = await jwtInterceptor.get("/experiences/", {
          headers: { "content-Type": "application/json" },
          withCredentials: true,
        });
        const products = response.data; // Extract and save the product data from the response
        // Update the state with the product data, adding a "slideNumber" property
        setNewProductData(
          products.map((product) => ({
            ...product,
            slideNumber: 0, // Initialize the slide number to 0
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(); // Call the fetchData function when this component is mounted
  }, []); // This useEffect only runs once when the component is mounted

  // Function to handle liking/unliking a product
  // productId is to indentify which product the user likes
  const handleLikes = async (productId) => {
    try {
      // Update the state to toggle the "isLiked" property for a specific product
      setNewProductData(
        (prevData) =>
          prevData.map((product) =>
            // Check if the product._id matches the productId provided as a parameter to the function
            // making a shallow copy of the state object and then updating the copy is to maintain immutability and ensure that state changes are handled correctly
            product._id === productId
              ? { ...product, isLiked: !product.isLiked }
              : product
          )
        // If the product._id doesn't match the productId, it simply returns the original product object without making any changes
        // If it does match the productId, It will create new object based on an existing object while updating a specific property within the object
      );
      // Make an HTTP PUT request to update the user's likes for a specific product
      await jwtInterceptor.put(`/users/likes/${productId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-16 sm:text-4xl">
            New this week
          </h1>
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {newProductData?.map((product, idx) => {
              // console.log('Product:', product._id);
              return (
                <div key={product._id} href={product.href} className="group">
                  <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <div className="w-full h-full flex transition-transform ease-in-out duration-700">
                      <img
                        src={product.files[product.slideNumber]}
                        alt="experiencesImage"
                        className="absolute block w-full h-full"
                      />
                      <div className="hidden group-hover:flex group-hover:opacity-100 mx-1 absolute top-0 bottom-0 left-0 items-center">
                        <button
                          onClick={() => {
                            // console.log('idx button clicked');
                            handleMove("l", idx);
                          }}
                          className="z-10 p-1 bg-gray-100 text-xl text-red-700 font-bold cursor-pointer rounded-full hover:bg-white"
                        >
                          <AiOutlineLeft className="mx-auto" />
                        </button>
                      </div>
                      <div className="hidden group-hover:flex group-hover:opacity-100 mx-1 absolute top-0 bottom-0 right-0 items-center">
                        <button
                          onClick={() => {
                            //console.log('right button clicked');
                            handleMove("r", idx);
                          }}
                          className="z-10 p-1 bg-gray-100 text-xl text-red-700 font-bold cursor-pointer rounded-full hover:bg-white"
                        >
                          <AiOutlineRight className="mx-auto" />
                        </button>
                      </div>
                    </div>
                    <div className="flex absolute justify-end mt-3 mr-4">
                      <button
                        className="flex absolute justify-end mt-2 mr-5 text-3xl text-red-700"
                        onClick={() => handleLikes(product._id)}
                      >
                        {product.isLiked ? (
                          <BsHeartFill />
                        ) : (
                          <BsHeartFill className="text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Link to={`/product/${product._id}`}>
                    <div>
                      <h1 className="mt-2 text-xl text-gray-700">
                        {product.title}
                      </h1>
                      <div className="flex-line flex-baseline">
                        <p className="inline mt-1 text-lg font-medium text-gray-900">
                          From {product.currency}
                          {product.price}
                        </p>
                        <p>
                          {product.city}, {product.country}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
