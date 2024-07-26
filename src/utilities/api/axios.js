import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Create a custom Axios instance
export const axiosAuthService = axios.create({
    baseURL: "https://staging.hypadmin.marketgpt.ai/api/auth/",
});

export const axiosApiService = axios.create({
    baseURL: "https://staging.hypadmin.marketgpt.ai/api/",
});
