// FileAPIs.js
import { axiosApiService } from "./axios"; // Ensure correct import

const FileAPIs = {
  UploadFilePost: async function ({ accessToken, values }) {
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    try {
      const response = await axiosApiService.post(
        'data/generate-presigned-url/',
        values, // Send values directly
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // Ensure correct content type
          },
        }
      );

      return response.data;
    } catch (error) {
      // Optional: Log error details for debugging
      console.error('API Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default FileAPIs;
