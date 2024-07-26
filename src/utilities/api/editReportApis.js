import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const EditReport_API = {
    
    createReport: async function  ({accessToken,report_name,owner,nodes,users_access,template}) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.post('reports/report/',{
                report_name: report_name,
                owner: owner,
                nodes: nodes,
                users_access:users_access,
                template:template
            }, {
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

export default EditReport_API;
