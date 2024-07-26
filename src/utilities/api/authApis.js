import { axiosApiService, axiosAuthService } from "./axios";
const Auth_API = {

    register: async function  (values) {
            const formData = values;
            
            const response = await axiosAuthService.post(`register/`, formData);
            return response;
        },

    login: async function ( values ) {
            const formData = values;
            console.log(values);
            const response = await axiosAuthService.post(`login/`, formData);
            return response;
    }
};

export default Auth_API;
