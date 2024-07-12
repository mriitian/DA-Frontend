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
import AccessModalSlice from "./accessModalSlice";
import newReportModalSlice from "./newReportModalSlice";
import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";
import ReportDrawerSlice from "./reportDrawerSlice";

const rootReducer = combineReducers({
    access_modal: AccessModalSlice.reducer,
    report_modal: newReportModalSlice.reducer,
    signup: signupSlice.reducer,
    login: loginSlice.reducer,
    report_drawer: ReportDrawerSlice.reducer
});

const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: storage,
        blacklist: ["access_modal","report_modal", "report_drawer"],
    },
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;