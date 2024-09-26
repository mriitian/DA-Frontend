import { axiosApiService } from "../axios";

const TemplateAPIs = {
    async getList() {
        try {
            const response = await axiosApiService.get('templates/');
            console.log('TemplateAPIs getList response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching the template list:', error);
            throw error;
        }
    },

    async getDetail(id) {
        try {
            const response = await axiosApiService.get(`templates/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching the template detail for ID ${id}:`, error);
            throw error;
        }
    },

    async createTemplate(data) {
        try {
            const response = await axiosApiService.post('templates/', data);
            return response.data;
        } catch (error) {
            console.error('Error creating a new template:', error);
            throw error;
        }
    },

    async updateTemplate(id, data) {
        try {
            const response = await axiosApiService.put(`templates/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating the template with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteTemplate(id) {
        try {
            const response = await axiosApiService.delete(`templates/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting the template with ID ${id}:`, error);
            throw error;
        }
    }
};

export default TemplateAPIs;
