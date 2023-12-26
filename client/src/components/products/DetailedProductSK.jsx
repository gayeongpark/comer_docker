import React from "react";
// This is the component for the detailedProduct component
// It should be updated
export default function DetailedProductSK() {
  return (
    <div>
      <div className="mx-auto mt-6 max-w-2xl animate-pulse bg-gray-400 rounded sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="text-5xl font-bold tracking-tight text-gray-900 sm:text-3xl animate-pulse bg-gray-400 rounded"></div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center animate-pulse bg-gray-400 rounded">
            <div className="text-red-700 animate-pulse bg-gray-400 rounded"></div>
            <p className="ml-1 text-gray-500 text-sm animate-pulse bg-gray-400 rounded"></p>
          </div>
          <div className="flex flex-row-reverse items-center"></div>
        </div>
      </div>
      <div className="pt-3">
        {/* Image gallery */}

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="animate-pulse bg-gray-400 aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"></div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="animate-pulse bg-gray-400 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"></div>
            <div className="animate-pulse bg-gray-400 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"></div>
          </div>
          <div className="animate-pulse bg-gray-400 rounded aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"></div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div className="flex flex-row mt-2 animate-pulse bg-gray-400 rounded">
              {/* {detailedProductData?.experience?.tags.map((tag) => { */}
              {/* return ( */}
              <div
                // key={tag}
                className="flex flex-row rounded-full mr-2 text-white p-1"
              >
                <div className="px-2 py-1">{/* #{tag} */}</div>
              </div>
              {/* ); */}
              {/* })} */}
            </div>
          </div>

          {/* Appointment */}

          <div className="py-8 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-1">
            {/* Owner information */}
            {/* {detailedProductData?.owner && ( */}
            <div>
              <div className="flex items-center gap-2 justify-between py-5">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse bg-gray-400 rounded">
                    {/* {detailedProductData.owner.profilePicture ? (
                        <img
                          className='h-20 w-20 rounded-full'
                          src={`http://localhost:8000/${detailedProductData.owner.profilePicture}`}
                          alt='profileImage'
                        />
                      ) : (
                        <img
                          className='h-20 w-20 rounded-full'
                          src='https://www.donut.app/assets/donut.png'
                          alt='profileImage'
                        />
                      )} */}
                  </div>
                  <div>
                    <div className="animate-pulse bg-gray-400 rounded flex flex-wrap justify-center text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      <p className="mb-1 sm:mr-2 sm:mb-0 animate-pulse bg-gray-400 rounded">
                        {/* Experience hosted by */}
                      </p>
                      <p className="mb-1 sm:mr-1 sm:mb-0 animate-pulse bg-gray-400 rounded">
                        {}
                      </p>
                      {/* <p className='mb-1'>
                          {detailedProductData.owner.lastName}
                        </p> */}
                    </div>
                    <div className="flex text-gray-500 items-center text-sm">
                      <p className="text-red-700 animate-pulse bg-gray-400 rounded">
                        {/* <MdLocationOn /> */}
                      </p>
                      <p className="mb-1">
                        {/* {detailedProductData.owner.city},{' '} */}
                      </p>
                      <p className="mb-1">
                        {/* {detailedProductData.owner.country} */}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className='flex'>
                  <button
                    type='button'
                    className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  >
                    Message
                  </button>
                </div> */}
              </div>
              <div
                style={{ whiteSpace: "pre-line" }}
                className="border-b border-gray-200"
              >
                {/* {detailedProductData.owner.description} */}
                <div className="flex justify-end mt-2 text-gray-400">
                  {/* {detailedProductData.owner.firstName} joined since{' '}
                    {new Date(
                      detailedProductData.owner.createdAt
                    ).getFullYear()} */}
                </div>
              </div>
            </div>
            {/* )} */}

            {/* Description and details */}
            <div className="mt-10">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  What you'll do
                </h3>
                <p
                  className="text-base text-gray-900 animate-pulse bg-gray-400 rounded"
                  style={{ whiteSpace: "pre-line" }}
                >
                  22
                </p>
              </div>
            </div>

            {/* Language */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">Hosted in</h3>
              <div className="flex mt-5">
                {/* {detailedProductData?.experience?.language.map((lan, index) => {
                  return ( */}
                <div
                  //   key={index}
                  className="flex border-2 border-red-700 mr-4 justify-center items-center p-2 bg-red-700 rounded-full"
                >
                  <p className="text-base justify-center items-center text-white">
                    {/* {lan} */}
                  </p>
                </div>
                {/* );
                })} */}
              </div>
            </div>

            {/* Perks */}
            <div className="flex-row mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                What's included
              </h3>
              <div className="mt-5">
                <ul className="animate-pulse bg-gray-400 rounded grid grid-cols-4 gap-4 text-sm"></ul>
              </div>
            </div>

            {/* Location */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                Where we will meet
              </h3>
              <div className="flex mt-5">
                {/* {detailedProductData?.experience?.coordinates && (
                  <Map
                    key={detailedProductData?.owner?._id}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOXAPIKEY}
                    initialViewState={{
                      longitude: detailedProductData?.experience?.longitude,
                      latitude: detailedProductData?.experience?.latitude,
                      zoom: 15,
                    }}
                    style={{ width: 600, height: 400 }}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                  >
                    <Marker
                      longitude={detailedProductData?.experience?.longitude}
                      latitude={detailedProductData?.experience?.latitude}
                      anchor='bottom'
                      zoom={15}
                    >
                      <MdLocationOn />
                    </Marker>
                    <NavigationControl />
                  </Map>
                )} */}
              </div>
              <p>{/* {detailedProductData?.experience?.fullAddress} */}</p>
            </div>

            {/* Things to know */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                Things to know
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-md text-gray-600 text-bold">Requirement</p>
                  {/* {detailedProductData?.experience?.kidsAllowed === true && (
                    <p className='flex mt-4 items-center'>
                      <FaBaby className='mr-2' />
                      Guest can bring kids under 4 years
                    </p>
                  )}
                  {detailedProductData?.experience?.petsAllowed === true && (
                    <p className='flex mt-4 items-center'>
                      <MdOutlinePets className='mr-2' />
                      Guest can bring their pets
                    </p>
                  )}
                  {detailedProductData?.experience?.maxGuest &&
                    detailedProductData?.experience?.minimumAge && (
                      <p className='flex mt-4 items-center'>
                        <BsPeopleFill className='mr-2' />
                        Guests ages{' '}
                        {detailedProductData?.experience?.minimumAge} and up can
                        attend, up to{' '}
                        {detailedProductData?.experience?.maxGuest} guests
                        total.
                      </p>
                    )} */}
                </div>
                <div>
                  <p className="text-md text-gray-600 text-bold">
                    Cancellation policy
                  </p>
                  {/* {detailedProductData?.experience?.cancellation1 === true && (
                    <p className='flex mt-4 items-center'> */}
                  {/* <MdFreeCancellation className='mr-2' /> */}
                  {/* Guests can cancel until 7 days before the Experience start
                      time for a full refund, or within 24 hours of booking as
                      long as the booking is made more than 48 hours before the
                      start time. */}
                  {/* </p>
                  )}
                  {detailedProductData?.experience?.cancellation2 === true && (
                    <p className='flex mt-4 items-center'> */}
                  {/* <MdFreeCancellation className='mr-2' /> */}
                  {/* Guests can cancel until 24 hours before the Experience
                      start time for a full refund.
                    </p>
                  )} */}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">Comments</h3>
              <div className="flex mt-5">
                {/* <Comments experienceId={detailedProductData?.experience?._id} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
