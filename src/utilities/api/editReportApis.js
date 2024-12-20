import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const EditReport_API = {
    
    createReport: async function  ({id,accessToken,report_name,owner,nodes,users_access,template,datasources}) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.put(`reports/reports/${id}/`,{
                report_name: report_name,
                nodes: nodes,
                users_access:users_access,
                // template:template,
                // datasource:datasources
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
