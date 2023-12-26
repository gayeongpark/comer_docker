import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BookedExperience from "../components/Booking/BookedExperience";

export default function BookedExperiences() {
  return (
    <div>
      <Navbar />
      <BookedExperience />
      <Footer />
    </div>
  );
}
