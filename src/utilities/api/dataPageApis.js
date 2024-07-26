import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const DataPage_API = {
    
    getBrands: async function  (accessToken) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.get('data/brand', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            
            return response.data;
        }
        catch (error) {
            throw(error);
        }
    }
};

export default DataPage_API;
