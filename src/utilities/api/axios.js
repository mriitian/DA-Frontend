import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logout  from "../../store/slices/loginSlice"; // Update this import according to your file structure

// Create a custom Axios instance for authentication-related requests
export const axiosAuthService = axios.create({
    baseURL: "https://staging.hypadmin.marketgpt.ai/api/auth/",
    // baseURL: "http://localhost:8000/api/auth/",
});

// Create a custom Axios instance for other API requests
export const axiosApiService = axios.create({
    baseURL: "https://staging.hypadmin.marketgpt.ai/api/",
    // baseURL: "http://localhost:8000/api/",
});

// Function to add interceptors to an axios instance
const addAuthInterceptor = (axiosInstance, token, dispatch) => {
    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor (Optional: to handle token expiration or other errors)
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Unauthorized, possibly token expired or invalid
                dispatch(logout());
                // You can also redirect the user to login page or show a message
            }
            return Promise.reject(error);
        }
    );
};

// Custom hook to setup interceptors
export const useAxiosInterceptors = () => {
    const token = useSelector((state) => state.login.token); // Adjust according to your state structure
    const dispatch = useDispatch();

    useEffect(() => {
        addAuthInterceptor(axiosAuthService, token, dispatch);
        addAuthInterceptor(axiosApiService, token, dispatch);
    }, [token, dispatch]);
};
