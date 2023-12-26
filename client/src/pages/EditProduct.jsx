import React from "react";
import { useLocation } from "react-router-dom";
import EditPost from "../components/Posting/EditPost";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function EditProduct() {
  const location = useLocation(); // Get the current location
  // useLocation uses React Router to navigate between views and pages
  // It allows user to access the current location, which includes information about the URL and route parameters
  // Access the post._id from the location state
  const postId = location.state?.postId;
  return (
    <div>
      <Navbar />
      {/* It passes the postId as a prop to the EditPost component, which can use this postId for further processing or rendering. */}
      <EditPost postId={postId} />
      <Footer />
    </div>
  );
}
