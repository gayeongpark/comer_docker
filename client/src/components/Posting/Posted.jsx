import React, { useState, useEffect } from "react";
import jwtInterceptor from "../../interceptors/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Posted() {
  const [userPosts, setUserPosts] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState("");
  // const { id } = useParams();
  const authUser = useSelector((state) => state.authUser.value);
  // console.log(authUser.id);
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await jwtInterceptor.get(
          `/experiences/profile/${authUser.id}`,
          {
            headers: { "content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserPosts();
  }, [authUser.id]);

  // console.log(userPosts);

  const handleDelete = async (postId) => {
    try {
      if (!postId) {
        throw new Error("Post does not have an _id property.");
      }
      alert("Do you want to delete this experience?");
      setLoadingDelete(true); // set loading state to true
      setDeletingPostId(postId);
      await jwtInterceptor.delete(`/experiences/deleteAExperience/${postId}`, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      setUserPosts((oldValues) => {
        return oldValues.filter((post) => post._id !== postId);
      });
      setLoadingDelete(false); // set loading state to false after successful delete
      setDeletingPostId(""); // clear deletingPostId after successful delete
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setLoadingDelete(false);
      setDeletingPostId("");
    }
  };

  return (
    <div className="mx-auto mb-20 max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
      {userPosts.map((post) => (
        <div
          key={post._id}
          className="flex justify-between mx-auto max-w-2xl p-5 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
        >
          <Link to={`/product/${post._id}`}>
            <button className="flex text-2xl items-center justify-center">
              <h2>{post.title}</h2>
            </button>
          </Link>
          <div className="flex flex-col justify-between gap-4 items-center">
            <div>
              <Link to={"/myExperience/edit"} state={{ postId: post._id }}>
                <button className="flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Edit
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={() => handleDelete(post._id)}
                disabled={loadingDelete} // disable button while loading
                className="flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {loadingDelete && deletingPostId === post._id ? (
                  <div className="flex rounded-md border border-transparent bg-red-700 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600"
                        viewBox="0 0 24 24"
                      >
                        Processing
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
