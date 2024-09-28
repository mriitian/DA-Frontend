import { axiosApiService } from "../axios";

const ReportAPIs = {
    // Method to fetch a list of reports
    async getList() {
        try {

            // Check the API whether the detail and list have difference  "report" and "reports"
            
            const response = await axiosApiService.get('reports/report/');
            console.log('ReportAPIs getList response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching the report list:', error);
            throw error;
        }
    },

    // Method to fetch details of a specific report by ID
    async getDetail(id) {
        try {
            const response = await axiosApiService.get(`reports/reports/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching the report detail for ID ${id}:`, error);
            throw error;
        }
    },

    // Method to create a new report
    async createReport(data) {
        try {
            const response = await axiosApiService.post('reports/report/', data);
            return response.data;
        } catch (error) {
            console.error('Error creating a new report:', error);
            throw error;
        }
    },

    // Method to update an existing report by ID
    async updateReport(id, data) {
        try {
            const response = await axiosApiService.put(`reports/reports/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating the report with ID ${id}:`, error);
            throw error;
        }
    },

    // Method to delete a specific report by ID
    async deleteReport(id) {
        try {
            const response = await axiosApiService.delete(`reports/reports/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting the report with ID ${id}:`, error);
            throw error;
        }
    }
};

export default ReportAPIs;
