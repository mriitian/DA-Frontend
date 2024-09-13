import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Create a custom Axios instance
export const axiosAuthService = axios.create({
    // baseURL: "https://staging.hypadmin.marketgpt.ai/api/auth/",
    baseURL: "http://localhost:8000/api/auth/",
});

export const axiosApiService = axios.create({
    // baseURL: "https://staging.hypadmin.marketgpt.ai/api/",
    baseURL: "http://localhost:8000/api/",
});
