// Import configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import the authReducer from a separate file (e.g., authSlice)
import authReducer from "./authSlice";

// Create a Redux store using configureStore
export const store = configureStore({
  reducer: {
    authUser: authReducer,
  },
});

export const RootState = store.getState();
// RootState retrieves the current state from the store
export const AppDispatch = store.dispatch;
// AppDispatch is the function used to dispatch actions to the store.
