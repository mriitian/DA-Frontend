import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const OrganizationalData_API = {
    
    getDataSources: async function  (accessToken) {
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
    getDataFolders: async function  (accessToken) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.get('data/datafolder/?security_type=organizational', {
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
};

export default OrganizationalData_API;
