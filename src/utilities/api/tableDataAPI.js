import { axiosApiService } from "./axios";

const tableDataAPI = {
    getOpenData: async function(values) {
        try {
            const response = await axiosApiService.post('/data/datasources/pagination/', values);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default tableDataAPI;
