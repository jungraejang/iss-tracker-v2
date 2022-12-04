import { configureStore } from "@reduxjs/toolkit";
import issReducer from "../slices/issSlice";

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    iss: issReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});
