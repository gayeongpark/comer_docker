import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import jwtInterceptor from "../../interceptors/axios";
import { useSelector } from "react-redux";

export default function BookedExperience() {
  const { userId } = useParams(); // Get the 'userId' parameter from the route
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Get the navigation function for routing
  // Get the authenticated user data from the Redux store
  const authUser = useSelector((state) => state.authUser.value);

  // Get booked experience data
  useEffect(() => {
    // Define a function to fetch the booking data
    const fetchBookings = async () => {
      try {
        // Make an HTTP request to your backend API to fetch bookings for the specified user
        const response = await jwtInterceptor.get(
          `/experiences/bookedExperience/${userId}`,
          {
            headers: { "content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // Set the bookings in the state
        setBookings(response.data.bookings);
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    // Call the function to fetch bookings when the component mounts
    fetchBookings();
  }, [userId]);
  // console.log(bookings);

  // This is the cancelBooking function with the given booking id
  const cancelBooking = async (bookingId) => {
    // Display a confirmation dialog to ensure the user wants to cancel the booking
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    // If user clicks yes === true
    if (confirmCancel) {
      try {
        // Make an HTTP request to your backend to cancel the booking
        const response = await jwtInterceptor.delete(
          `/experiences/cancel-booking/${bookingId}`,
          {
            headers: { "content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // Check the response from the server
        if (response.status === 200) {
          // Show a success message to the user if the cancellation was successful
          alert(response.data.message);
          // Reload the page after a successful cancellation
          navigate("/");
        }
      } catch (error) {
        // Handle network or other unexpected errors
        alert("Failed to cancel the booking: " + error.response.data);
      }
    }
  };

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
          {/* Maps through the bookings array to display booking information for the authenticated user.  */}
          {bookings.map((bookingGroup, groupIndex) => (
            <article key={groupIndex}>
              {/* The reason why I maped twice is that booking slot data is located in bookings.booking */}
              {bookingGroup.booking
                .filter((booking) => booking.userEmail === authUser.email) // Filter bookings for the authenticated user
                .map((booking, index) => (
                  <div
                    key={index}
                    className="flex justify-between mx-auto max-w-2xl p-5 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
                  >
                    <p className="flex text-xl items-center justify-center">
                      {booking.date.split("T")[0]}
                      {/* To display only date */}
                    </p>
                    <p className="flex text-lg items-center justify-center">
                      {booking.startTime} - {booking.endTime}
                    </p>
                    {/* If user clicks the title, user will be navigated to the detailed page */}
                    <Link to={`/product/${booking.experienceId}`}>
                      <p className="flex text-2xl items-center justify-center">
                        {booking.experienceTitle}
                      </p>
                    </Link>
                    <div>
                      {/* The arrow function calls the cancelBooking function with the booking._id as its argument. It is to pass the id to the cancelBooking function */}
                      <button
                        className="flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => cancelBooking(booking._id)}
                      >
                        Cancel booking
                      </button>
                    </div>
                  </div>
                ))}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
