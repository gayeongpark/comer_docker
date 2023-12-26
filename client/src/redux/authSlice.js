// Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the "authUser" slice
const initialState = {
  value: false, // This represents the initial authentication status (e.g., user is not authenticated)
};

// Create a Redux slice named "authUser"
// value is the data of logged in user
export const authSlice = createSlice({
  name: "authUser", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Define a reducer function called "setAuthUser"
    setAuthUser: (state, action) => {
      // state represents the current state of the slice
      // action represents the dispatched action and can carry a payload.
      state.value = action.payload; // Update the "value" property in the state with the payload value
    },
  },
});

// Export the "setAuthUser" action creator
// The setAuthUser action can be dispatched when the user logs in or logs out, and it updates the value property in the state to reflect the user's authentication status.
export const { setAuthUser } = authSlice.actions;

// Export the reducer function for the "authUser" slice
export default authSlice.reducer;
