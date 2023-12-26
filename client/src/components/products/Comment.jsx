import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwtInterceptor from "../../interceptors/axios";

export default function Comment({ comment }) {
  const [commentOwner, setCommentOwner] = useState({});
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dateString, setDateString] = useState("");
  const [deleted, setDeleted] = useState(false);

  const authUser = useSelector((state) => state.authUser.value);

  useEffect(() => {
    const fetchCommentOwner = async () => {
      if (!comment.userId) {
        throw new Error("Comment does not have an userId property.");
      }
      const response = await jwtInterceptor.get(
        `/users/comments/${comment.userId}`,
        {
          headers: { "content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setCommentOwner(response.data);
    };
    fetchCommentOwner();
  }, [comment]);

  useEffect(() => {
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diff = Math.round((now - createdAt) / (1000 * 60 * 60 * 24));

    if (diff === 0) {
      setDateString("Today");
    } else if (diff === 1) {
      setDateString("Yesterday");
    } else {
      setDateString(`${diff} days ago`);
    }
  }, [comment.createdAt]);

  const isLoggedInUser = comment.userId === authUser.id;

  const handleDelete = async () => {
    try {
      if (!comment._id) {
        throw new Error("Comment does not have an _id property.");
      }
      setLoadingDelete(true); // set loading state to true
      await jwtInterceptor.delete(`/comments/delete/${comment._id}`, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });
      setDeleted(true); // set deleted state to true
    } catch (error) {
    } finally {
      setLoadingDelete(false); // set loading state to false
    }
  };

  if (loadingDelete) {
    // if the delete request is in progress, show a loading spinner
    return (
      <div className="flex m-4" role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600 items-center"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (deleted) {
    // if the comment has been deleted, automatically reload the component
    return null;
  }

  return (
    <div className="flex gap-4 my-4 border-b pb-2">
      {commentOwner?.profilePicture ? (
        <img
          className="w-12 h-12 rounded-full"
          src={`${commentOwner.profilePicture}`}
          alt="avatar"
        />
      ) : (
        <img
          className="w-12 h-12 rounded-full"
          src="https://www.donut.app/assets/donut.png"
          alt="avatar"
        />
      )}
      <div className="flex flex-col text-gray-800">
        <span className="font-semibold">
          {commentOwner?.email}
          <span className="ml-2 text-sm text-gray-400">{dateString}</span>
        </span>
        <span className="text-sm">{comment?.description}</span>
      </div>
      <div className="flex flex-col-reverse">
        {isLoggedInUser && (
          <button onClick={handleDelete} className="text-red-600 ml-5">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
