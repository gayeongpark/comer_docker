import React, { useState, useEffect } from "react";
import jwtInterceptor from "../../interceptors/axios";
import { useParams } from "react-router-dom";
import { MdLocationOn, MdOutlinePets } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaBaby } from "react-icons/fa";
import { BsHeart, BsHeartFill, BsPeopleFill } from "react-icons/bs";
import { GiForkKnifeSpoon, GiSodaCan, GiCookingPot } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl";
import Comments from "./Comments";
import DetailedProductSK from "./DetailedProductSK";
import BookingModal from "../Booking/BookingModal";

export default function DetailedProduct() {
  const { id } = useParams();
  const [detailedProductData, setDetailedProductData] = useState();
  const [selectedDateMaxGuestPairId, setSelectedDateMaxGuestPairId] =
    useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const authUser = useSelector((state) => state.authUser.value);

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const handleLikes = async () => {
    if (detailedProductData?.experience?.likes.includes(authUser.id)) {
      // User has already liked the product, so we need to remove their ID from the likes array
      const updatedLikes = detailedProductData.experience.likes.filter(
        (id) => id !== authUser.id
      );
      await jwtInterceptor.put(`/users/likes/${id}`, updatedLikes, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
    } else {
      // User has not liked the product yet, so we need to add their ID to the likes array
      const updatedLikes = [
        ...detailedProductData.experience.likes,
        authUser.id,
      ];
      await jwtInterceptor.put(`/users/likes/${id}`, updatedLikes, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchDetailedProductData = async () => {
      try {
        const { data } = await jwtInterceptor.get(`/experiences/${id}`, {
          withCredentials: true,
        });
        setDetailedProductData(data);
        setIsLiked(data.experience.likes.includes(authUser.id));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    fetchDetailedProductData();
  }, [id, authUser]);

  // console.log(detailedProductData);

  const startDate = new Date(detailedProductData?.experience?.startDate);
  // console.log(startDate);
  const endDate = new Date(detailedProductData?.experience?.endDate);
  // console.log(endDate);

  const dateStrings = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateStrings.push(
      currentDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
      })
    );
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            {/* <h2 className="text-3xl mr-48">Photos of {place.title}</h2> */}
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {detailedProductData?.experience?.files?.length > 0 &&
            detailedProductData?.experience?.files.map((photo, index) => (
              <div key={index}>
                <img src={`${photo}`} alt="allImage" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <DetailedProductSK />
      ) : (
        <div className="bg-white">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {detailedProductData?.experience?.title}
            </h1>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <div className="text-red-700">
                  <MdLocationOn />
                </div>
                <p className="ml-1 text-gray-500 text-sm">
                  {detailedProductData?.experience?.city},{" "}
                  {detailedProductData?.experience?.country}
                </p>
              </div>
              <div className="flex flex-row-reverse items-center">
                <div
                  className="text-3xl text-red-700 cursor-pointer"
                  onClick={handleLikes}
                >
                  {isLiked ? <BsHeartFill /> : <BsHeart />}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3">
            {/* Image gallery */}
            {detailedProductData?.experience?.files && (
              <>
                {" "}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={`${detailedProductData.experience.files[0]}`}
                      alt="productImage1"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={`${detailedProductData.experience.files[1]}`}
                        alt="productImage2"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={`${detailedProductData.experience.files[2]}`}
                        alt="productImage3"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={`${detailedProductData.experience.files[3]}`}
                      alt="productImage4"
                      className="h-full w-full object-cover object-center"
                    />
                    <div>
                      <button
                        onClick={() => setShowAllPhotos(true)}
                        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Show more photos
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <div className="flex flex-row mt-2">
                  {detailedProductData?.experience?.tags.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row bg-red-700 rounded-full mr-2 text-white p-1"
                      >
                        <div className="px-2 py-1">#{tag}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                {/* <p className='text-3xl tracking-tight text-gray-900'>
              {detailedProductData?.experience?.currency}
              {detailedProductData?.experience?.price}
            </p> */}

                {/* Appointment */}
                <div>
                  <div className="mt-6">
                    <div className="flex flex-wrap justify-between gap-4 mt-3">
                      {detailedProductData?.availability[0]?.dateMaxGuestPairs.map(
                        (dateMaxGuestPair, index) => (
                          <div className="flex-auto" key={index}>
                            <div className="border-2 p-4 items-center rounded-md">
                              <div className="mb-4">
                                <div className="flex text-xl font-bold">
                                  {dateMaxGuestPair.date.split("T")[0]}
                                </div>
                                <div className="font-light">
                                  {dateMaxGuestPair.startTime} -{" "}
                                  {dateMaxGuestPair.endTime}
                                </div>
                                <div className="flex gap-1 mt-2 font-light">
                                  Available{" "}
                                  <div className="font-normal">
                                    {dateMaxGuestPair.maxGuest}
                                  </div>
                                  guests
                                </div>
                              </div>
                              <div className="flex mb-4">
                                <div className="font-bold text-xl">
                                  {detailedProductData?.experience?.currency}
                                  {detailedProductData?.experience?.price}
                                </div>
                                <div className="ml-2"> / person</div>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedDateMaxGuestPairId(
                                      dateMaxGuestPair._id
                                    );
                                    setOpenModal(true);
                                  }}
                                  className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                  Choose
                                </button>
                                <BookingModal
                                  open={openModal}
                                  experienceId={id}
                                  dateMaxGuestPairId={
                                    selectedDateMaxGuestPairId
                                  }
                                  onClose={() => {
                                    setSelectedDateMaxGuestPairId(null);
                                    setOpenModal(false);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-1">
                {/* Owner information */}
                {detailedProductData?.owner && (
                  <div>
                    <div className="flex items-center gap-2 justify-between py-5">
                      <div className="flex items-center gap-3">
                        <div>
                          {detailedProductData.owner.profilePicture ? (
                            <img
                              className="h-20 w-20 rounded-full"
                              src={`${detailedProductData.owner.profilePicture}`}
                              alt="profileImage"
                            />
                          ) : (
                            <img
                              className="h-20 w-20 rounded-full"
                              src="https://www.donut.app/assets/donut.png"
                              alt="profileImage"
                            />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap justify-center text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            <p className="mb-1 sm:mr-2 sm:mb-0">
                              Experience hosted by
                            </p>
                            <p className="mb-1 sm:mr-1 sm:mb-0">
                              {detailedProductData.owner.firstName}
                            </p>
                          </div>
                          <div className="flex text-gray-500 items-center text-sm">
                            <p className="text-red-700">
                              <MdLocationOn />
                            </p>
                            <p className="ml-1 text-gray-500 text-sm">
                              {detailedProductData?.experience?.city},{" "}
                              {detailedProductData?.experience?.country}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Message
                        </button>
                      </div>
                    </div>
                    <div
                      style={{ whiteSpace: "pre-line" }}
                      className="border-b border-gray-200"
                    >
                      {detailedProductData.owner.description}
                      <div className="flex justify-end mt-2 text-gray-400">
                        {detailedProductData.owner.firstName} joined since{" "}
                        {new Date(
                          detailedProductData.owner.createdAt
                        ).getFullYear()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Description and details */}
                <div className="mt-10">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      What you'll do
                    </h3>
                    <p
                      className="text-base text-gray-900"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {detailedProductData?.experience?.description}
                    </p>
                  </div>
                </div>

                {/* Language */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Language
                  </h3>
                  <div className="flex mt-5">
                    {detailedProductData?.experience?.language.map(
                      (lan, index) => {
                        return (
                          <div
                            key={index}
                            className="flex border-2 border-red-700 mr-4 justify-center items-center p-2 bg-red-700 rounded-full"
                          >
                            <p className="text-base justify-center items-center text-white">
                              {lan}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Perks */}
                <div className="flex-row mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    What's included
                  </h3>
                  <div className="mt-5">
                    <ul className="grid grid-cols-4 gap-4 text-sm">
                      {detailedProductData?.experience?.perks?.food && (
                        <li
                          key="food"
                          className="items-center text-gray-400 border-2 p-4 rounded-md"
                        >
                          <span className="flex justify-center text-red-700 text-3xl mb-2 font-bold">
                            <GiForkKnifeSpoon />
                          </span>
                          <span className="flex justify-center text-lg mb-2 text-gray-900 font-bold">
                            Food
                          </span>
                          <span className="flex text-gray-600 text-md justify-center">
                            {detailedProductData?.experience?.perks?.food}
                          </span>
                        </li>
                      )}
                      {detailedProductData?.experience?.perks?.beverage && (
                        <li
                          key="beverage"
                          className="items-center text-gray-400 border-2 p-4 rounded-md"
                        >
                          <span className="flex justify-center text-red-700 text-3xl mb-2 font-bold">
                            <GiSodaCan />
                          </span>
                          <span className="flex justify-center text-lg mb-2 text-gray-900 font-bold">
                            Beverage
                          </span>
                          <span className="flex text-gray-600 text-md justify-center">
                            {detailedProductData?.experience?.perks?.beverage}
                          </span>
                        </li>
                      )}
                      {detailedProductData?.experience?.perks?.equipment && (
                        <li
                          key="equipment"
                          className="items-center text-gray-400 border-2 p-4 rounded-md"
                        >
                          <span className="flex justify-center text-red-700 text-3xl mb-2 font-bold">
                            <GiCookingPot />
                          </span>
                          <span className="flex justify-center text-lg mb-2 text-gray-900 font-bold">
                            Equipment
                          </span>
                          <span className="flex text-gray-600 text-md justify-center">
                            {detailedProductData?.experience?.perks.equipment}
                          </span>
                        </li>
                      )}
                      {detailedProductData?.experience?.perks?.alcohol && (
                        <li
                          key="alcohol"
                          className="items-center text-gray-400 border-2 p-4 sm:p-2 rounded-md"
                        >
                          <span className="flex justify-center text-red-700 text-3xl mb-2 font-bold">
                            <BiDrink />
                          </span>
                          <span className="flex justify-center text-lg mb-2 text-gray-900 font-bold">
                            Alcohol
                          </span>
                          <span className="flex text-gray-600 text-md justify-center">
                            {detailedProductData?.experience?.perks?.alcohol}
                          </span>
                        </li>
                      )}
                      {detailedProductData?.experience?.perks?.others && (
                        <li
                          key="others"
                          className="items-center text-gray-400 border-2 p-4 rounded-md"
                        >
                          <span className="flex justify-center text-red-700 text-3xl mb-2 font-bold">
                            <GiForkKnifeSpoon />
                          </span>
                          <span className="flex justify-center text-lg mb-2 text-gray-900 font-bold">
                            Others
                          </span>
                          <span className="flex text-gray-600 text-md justify-center">
                            {detailedProductData?.experience?.perks?.others}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Location */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Where we will meet
                  </h3>
                  <div className="flex mt-5">
                    {detailedProductData?.experience?.coordinates && (
                      <Map
                        key={detailedProductData?.owner?._id}
                        mapboxAccessToken={process.env.REACT_APP_MAPBOXAPIKEY}
                        initialViewState={{
                          longitude: detailedProductData?.experience?.longitude,
                          latitude: detailedProductData?.experience?.latitude,
                          zoom: 15,
                        }}
                        style={{ width: 600, height: 400 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                      >
                        <Marker
                          longitude={detailedProductData?.experience?.longitude}
                          latitude={detailedProductData?.experience?.latitude}
                          anchor="bottom"
                          zoom={15}
                        >
                          <MdLocationOn />
                        </Marker>
                        <NavigationControl />
                      </Map>
                    )}
                  </div>
                  <p>{detailedProductData?.experience?.fullAddress}</p>
                </div>

                {/* Things to know */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Things to know
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-md text-gray-600 text-bold">
                        Requirement
                      </p>
                      {detailedProductData?.experience?.kidsAllowed ===
                        true && (
                        <p className="flex mt-4 items-center">
                          <FaBaby className="mr-2" />
                          Guest can bring kids under 4 years
                        </p>
                      )}
                      {detailedProductData?.experience?.petsAllowed ===
                        true && (
                        <p className="flex mt-4 items-center">
                          <MdOutlinePets className="mr-2" />
                          Guest can bring their pets
                        </p>
                      )}
                      {detailedProductData?.experience?.maxGuest &&
                        detailedProductData?.experience?.minimumAge && (
                          <p className="flex mt-4 items-center">
                            <BsPeopleFill className="mr-2" />
                            Guests ages{" "}
                            {detailedProductData?.experience?.minimumAge} and up
                            can attend, up to{" "}
                            {detailedProductData?.experience?.maxGuest} guests
                            total.
                          </p>
                        )}
                    </div>
                    <div>
                      <p className="text-md text-gray-600 text-bold">
                        Cancellation policy
                      </p>
                      {detailedProductData?.experience?.cancellation1 ===
                        true && (
                        <p className="flex mt-4 items-center">
                          {/* <MdFreeCancellation className='mr-2' /> */}
                          Guests can cancel until 7 days before the Experience
                          start time for a full refund, or within 24 hours of
                          booking as long as the booking is made more than 48
                          hours before the start time.
                        </p>
                      )}
                      {detailedProductData?.experience?.cancellation2 ===
                        true && (
                        <p className="flex mt-4 items-center">
                          {/* <MdFreeCancellation className='mr-2' /> */}
                          Guests can cancel until 24 hours before the Experience
                          start time for a full refund.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Comments
                  </h3>
                  <div className="flex mt-5">
                    <Comments
                      experienceId={detailedProductData?.experience?._id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
