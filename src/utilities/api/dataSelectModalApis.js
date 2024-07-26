import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const DataSelectModal_API = {
    
    getOpenData: async function  (accessToken) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.get('data/datasources/?security_type=open-source', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            
            return response.data;
        }
        catch (error) {
            throw(error);
        }
    },
    getOrgData: async function  (accessToken) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.get('data/datasources/?security_type=organizational', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            
            return response.data;
        }
        catch (error) {
            throw(error);
        }
    },
    getPrivateData: async function  (accessToken) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.get('data/datasources/?security_type=private', {
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

export default DataSelectModal_API;
