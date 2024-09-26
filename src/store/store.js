import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accessModalSlice from "./slices/accessModalSlice";
import newReportModalSlice from "./slices/newReportModalSlice";
import signupSlice from "./slices/signupSlice";
import loginSlice from "./slices/loginSlice";
import reportDrawerSlice from "./slices/reportDrawerSlice";
import reportStoreSlice from "./slices/reportStoreSlice";
import reportDatasourceSlice from "./slices/report_datasources";
import uploadSlice from "./slices/uploadsSlice";

// Combine all reducers
const rootReducer = combineReducers({
  access_modal: accessModalSlice.reducer,
  report_modal: newReportModalSlice.reducer,
  signup: signupSlice.reducer,
  login: loginSlice.reducer,
  report_drawer: reportDrawerSlice.reducer,
  report_store: reportStoreSlice.reducer,
  report_datasource: reportDatasourceSlice.reducer,
  upload: uploadSlice.reducer,
});

// Create a persisted reducer with blacklist configuration
const persistedReducer = persistReducer(
  {
    key: "root", // Key used to identify persisted data
    version: 1,  // Version of the persisted reducer
    storage,     // Storage engine used (local storage)
    blacklist: ["access_modal", "report_modal", "report_drawer"], // Slices not to persist
  },
  rootReducer
);

// Configure store with persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these actions for serialization check
      },
    }),
});

// Create the persistor object to handle persistence rehydration
export const persistor = persistStore(store);

export default store;
