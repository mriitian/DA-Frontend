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
import AccessModalSlice from "./slices/accessModalSlice";
import newReportModalSlice from "./slices/newReportModalSlice";
import signupSlice from "./slices/signupSlice";
import loginSlice from "./slices/loginSlice";
import ReportDrawerSlice from "./slices/reportDrawerSlice";
import ReportStoreSlice from "./slices/reportStoreSlice";
import ReportDatasourceSlice from "./slices/report_datasources";

const rootReducer = combineReducers({
    access_modal: AccessModalSlice.reducer,
    report_modal: newReportModalSlice.reducer,
    signup: signupSlice.reducer,
    login: loginSlice.reducer,
    report_drawer: ReportDrawerSlice.reducer,
    report_store: ReportStoreSlice.reducer,
    report_datasource: ReportDatasourceSlice.reducer
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