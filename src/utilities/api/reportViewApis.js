import { useState } from "react";
import { axiosApiService, axiosAuthService } from "./axios";

const ReportView_API = {
    
    getReport: async function  (accessToken,report_name) {
        if(!accessToken) {
            throw new Error('Access token is missing');
        }

        try {
            const response = await axiosApiService.get(`reports/reports/${report_name}`, {
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

export default ReportView_API;
