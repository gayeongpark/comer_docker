import React, { useEffect, useState } from "react";
import jwtInterceptor from "../../interceptors/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// This is the modal for booking an experience slot
// These arguments were passed from the detailedProduct component in order to make modal
export default function BookingModal({
  open,
  experienceId,
  dateMaxGuestPairId,
  onClose,
}) {
  const [experienceData, setExperienceData] = useState("");

  // Retrieve the authenticated user data from the Redux store
  const authUser = useSelector((state) => state.authUser.value);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If open is true
        if (open) {
          // Make an HTTP request to your back-end route using async/await
          const response = await jwtInterceptor.get(
            `/experiences/${experienceId}`,
            {
              headers: { "content-Type": "application/json" },
              withCredentials: true,
            }
          );
          // Handle the response and set the data as needed
          setExperienceData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [open, experienceId]);

  //   console.log(experienceData);
  //   console.log(dateMaxGuestPairId);

  if (!open) return null;

  // Function to handle booking payment
  const handleBookingPayment = async () => {
    try {
      // Make post request to make booking slot for this booking
      const response = await jwtInterceptor.post(
        `/experiences/booking/create-payment-intent`,
        {
          experienceId,
          dateMaxGuestPairId,
          userEmail: authUser.email,
          userId: authUser.id,
        },
        {
          headers: { "content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Show a success message to the user and navigate to the booked experience page
        alert(response.data.message);
        navigate(`/bookedExperience/${authUser.id}`);
      }
    } catch (error) {
      // Handle any errors that occur during the payment process
      alert("Error: " + error.response.data.error);
    }
  };

  return open ? (
    <div className="fixed bg-slate-200 inset-0 flex items-center justify-center">
      <div className="modalContainer">
        {experienceData ? (
          <>
            <img
              src={`${experienceData.experience.files[0]}`}
              alt="coverImage"
              className="w-96 h-96 object-cover rounded-tl-md rounded-bl-md"
            />
            <div className="modalRight w-96">
              <p onClick={onClose} className="closeBtn absolute top-4 right-4">
                X
              </p>
              <div className="content text-center mt-10 p-6">
                <p className="font-semibold text-lg">
                  Do you want to book this experience?
                </p>
                <h1 className="text-3xl font-bold mb-2">
                  {experienceData.experience.title}
                </h1>

                {experienceData?.availability[0]?.dateMaxGuestPairs
                  .filter(
                    (dateMaxGuestPair) =>
                      dateMaxGuestPair._id === dateMaxGuestPairId
                  )
                  .map((filteredDateMaxGuestPair) => (
                    <div key={filteredDateMaxGuestPair._id}>
                      <div className="text-base font-bold mb-1">
                        Date: {filteredDateMaxGuestPair.date.split("T")[0]}
                      </div>
                      <div className="text-base font-bold mb-1">
                        Time: {filteredDateMaxGuestPair.startTime} -{" "}
                        {filteredDateMaxGuestPair.endTime}
                      </div>
                      <div className="text-base font-bold mb-1">
                        Price: {filteredDateMaxGuestPair.currency}
                        {filteredDateMaxGuestPair.price}
                      </div>
                      <div className="text-base font-bold">
                        Available Spots: {filteredDateMaxGuestPair.maxGuest}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between p-6">
                <button
                  className="w-1/2 p-4 rounded-md font-bold bg-red-700 text-white mr-2"
                  onClick={handleBookingPayment}
                >
                  Book Now
                </button>
                <button
                  onClick={onClose}
                  className="w-1/2 p-4 border-2 rounded-md border-red-700 font-bold ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  ) : null;
}
