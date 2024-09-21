import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import { addUpload, updateUploadProgress } from '../../store/slices/uploadsSlice';
import FileAPIs from '../../utilities/api/FileAPIs';

const UploadPage = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const accessToken = useSelector(state => state.login.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = {
    bucketName: import.meta.env.VITE_APP_BUCKET_NAME,
    region: import.meta.env.VITE_APP_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_APP_ACCESS,
      secretAccessKey: import.meta.env.VITE_APP_SECRET,
    },
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('No file selected for upload.');
      return;
    }

    setIsUploading(true);
    setLoading(true);
    setError(null);

    // Prepare the values to send to the API
    const values = {
      file_name: fileName || selectedFile.name,
      file_type: selectedFile.type,
    };

    try {
      // Make the API call to send file metadata
      const data = await FileAPIs.UploadFilePost({ accessToken, values });
      console.log('API Response:', data);

      // Proceed with S3 multipart upload
      const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
      const uploadId = Date.now().toString();
      const uploadInfo = {
        id: uploadId,
        name: fileName || selectedFile.name,
        progress: 0,
        attributes: selectedAttributes,
      };

      dispatch(addUpload(uploadInfo));
      toast.info('File upload initialized...');
      setUploadProgress(0);

      const createMultipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: config.bucketName,
        Key: fileName || selectedFile.name,
        ContentType: selectedFile.type,
      });

      const createMultipartUploadResponse = await s3Client.send(createMultipartUploadCommand);
      const { UploadId } = createMultipartUploadResponse;
      const partSize = 5 * 1024 * 1024; // 5MB
      const parts = [];
      const fileSize = selectedFile.size;

      for (let partNumber = 1, start = 0; start < fileSize; partNumber++, start += partSize) {
        const end = Math.min(start + partSize, fileSize);
        const filePart = selectedFile.slice(start, end);

        let part;
        let attempts = 0;
        const maxRetries = 3;
        while (attempts < maxRetries) {
          try {
            const uploadPartCommand = new UploadPartCommand({
              Bucket: config.bucketName,
              Key: fileName || selectedFile.name,
              PartNumber: partNumber,
              UploadId,
              Body: filePart,
            });

            part = await s3Client.send(uploadPartCommand);
            break;
          } catch (error) {
            attempts++;
            if (attempts === maxRetries) {
              throw new Error(`Failed to upload part ${partNumber} after ${maxRetries} attempts`);
            }
            console.error(`Retrying part ${partNumber} (${attempts}/${maxRetries})`);
          }
        }

        parts.push({ ETag: part.ETag, PartNumber: partNumber });
        const progress = Math.round((end / fileSize) * 100);
        setUploadProgress(progress);
        dispatch(updateUploadProgress({ id: uploadId, progress }));
      }

      const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
        Bucket: config.bucketName,
        Key: fileName || selectedFile.name,
        UploadId,
        MultipartUpload: { Parts: parts },
      });

      await s3Client.send(completeMultipartUploadCommand);
      toast.success('File successfully uploaded!');
      setUploadProgress(0);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
      toast.error(`Error uploading file: ${errorMessage}`);
      setError(errorMessage);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        File Upload
      </Typography>

      <TextField
        label="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        fullWidth
        margin="dense"
      />

      <Select
        multiple
        value={selectedAttributes}
        onChange={(e) => setSelectedAttributes(e.target.value)}
        displayEmpty
        fullWidth
        margin="dense"
        renderValue={(selected) =>
          selected.length ? selected.join(', ') : 'Select attributes'
        }
      >
        <MenuItem value="attribute1">Attribute 1</MenuItem>
        <MenuItem value="attribute2">Attribute 2</MenuItem>
        <MenuItem value="attribute3">Attribute 3</MenuItem>
      </Select>

      <Box
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 1,
          padding: 2,
          marginY: 2,
          textAlign: 'center',
        }}
      >
        <input
          type="file"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span">
            Click or drag file to this area to upload
          </Button>
        </label>
      </Box>

      {uploadProgress > 0 && (
        <Box sx={{ marginY: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Progress: {uploadProgress}%
          </Typography>
        </Box>
      )}

      {loading && (
        <Typography variant="body2" color="textSecondary">
          Processing upload...
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </Button>
    </Box>
  );
};

export default UploadPage;
