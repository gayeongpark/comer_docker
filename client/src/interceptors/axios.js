import axios from "axios";
//Interceptors are functions that can be used to modify requests or responses before they are sent or received.
//In this case, interceptors are being used to automatically refresh the user's access token when it has expired.
//By using an interceptor, the process of refreshing the access token can be handled automatically without the need for the user to manually log in again, providing a better user experience.

const jwtInterceptor = axios.create({
  baseURL: "http://localhost:8000", // Replace with your server's base URL
  withCredentials: true, // Send cookies with every request
});

// Define a function to intercept responses from Axios requests.
jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  }, // If the response is successful, just return it without modifications.
  async (error) => {
    const originalRequest = error.config; // Initialize a variable to keep track of whether a token refresh is in progress.

    // Check if the error corresponds to a 401 Unauthorized status code and token refresh is not in progress.
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true; // Set the refresh flag to true to prevent multiple simultaneous refresh attempts.

        // Send a POST request to "/auth/refreshtoken" to refresh the access token.
        const response = await axios.post("/auth/refreshtoken", {
          withCredentials: true, // Include credentials (e.g., cookies) with the request.
        });

        // If the token refresh is successful (status code 200), reattempt the original request.
        if (response.status === 200) {
          // Retry the original request
          return jwtInterceptor(originalRequest);
          // This is a key part of the code that handles token refresh in the Axios interceptor
          // It is used to retry the original HTTP request after a successful token refresh.
          // error.config does contain enough information to recreate the original request.
          // It is a critical part of the code that allows the original request to be retried with a fresh access token after the token refresh, maintaining a smooth user experience.
          // To retry the original request, you need the request configuration, which includes the original URL, method, headers, and any request data.
          // Retrying the original request is a user-centric approach to handling expired tokens.
          // It ensures that the user's actions are not interrupted by the need to refresh tokens or perform additional login steps.
          // Instead, the application handles token refresh and seamlessly continues with the user's intended operation.
        }
      } catch (refreshError) {
        // Handle errors that may occur during the token refresh.
        return Promise.reject(refreshError);
      }
    } else {
      // Handle other error responses (e.g., network errors or non-401 errors).
      originalRequest._retry = false; // Reset the refresh flag.
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
