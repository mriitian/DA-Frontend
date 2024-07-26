import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const ReportModal_API = {
    
    createReport: async function  ({accessToken,report_name,description, owner,nodes,users_access,template,datasources}) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.post('reports/report/',{
                report_name: report_name,
                owner: owner,
                nodes: nodes,
                users_access:users_access,
                template:template,
                datasource:datasources,
                description:description
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

export default ReportModal_API;
