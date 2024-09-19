import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploads: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addUpload: (state, action) => {
      state.uploads.push(action.payload);
    },
    updateUploadProgress: (state, action) => {
      const { id, progress } = action.payload;
      const upload = state.uploads.find(upload => upload.id === id);
      if (upload) {
        upload.progress = progress;
      }
    },
  },
});

export const { addUpload, updateUploadProgress } = uploadSlice.actions;
export default uploadSlice;
