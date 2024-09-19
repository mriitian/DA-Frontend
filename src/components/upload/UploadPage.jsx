import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

const UploadPage = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Add this state to track upload status

  const config = {
    // bucketName: process.env.VITE_APP_BUCKET_NAME,
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

    setIsUploading(true); // Set isUploading to true when upload starts

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

    try {
      const createMultipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: config.bucketName,
        Key: fileName || selectedFile.name,
        ContentType: selectedFile.type,
      });

      const createMultipartUploadResponse = await s3Client.send(createMultipartUploadCommand);
      const { UploadId } = createMultipartUploadResponse;
      const partSize = 5 * 1024 * 1024; // 5MB part size
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
      toast.error(`Error uploading file: ${error.message}`);
      dispatch(updateUploadProgress({ id: uploadId, progress: 0 }));
    } finally {
      setIsUploading(false); // Reset isUploading to false when upload completes or fails
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
        margin="dense" // Adjusted to "dense" based on previous warning fix
      />

      <Select
        multiple
        value={selectedAttributes}
        onChange={(e) => setSelectedAttributes(e.target.value)}
        displayEmpty
        fullWidth
        margin="dense" // Adjusted to "dense"
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading} // Disable button during upload
      >
        Upload File
      </Button>
    </Box>
  );
};

export default UploadPage;



// // src/components/UploadPage.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   Box,
//   Button,
//   LinearProgress,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { toast } from 'react-toastify';
// import {
//   S3Client,
//   CreateMultipartUploadCommand,
//   UploadPartCommand,
//   CompleteMultipartUploadCommand,
// } from '@aws-sdk/client-s3';
// import { addUpload, updateUploadProgress } from '../../store/slices/uploadsSlice';

// const UploadPage = () => {
//   const dispatch = useDispatch();
//   const [fileName, setFileName] = useState('');
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const config = {
//     // bucketName: process.env.VITE_APP_BUCKET_NAME,
//     bucketName: import.meta.env.VITE_APP_BUCKET_NAME,
//     region: import.meta.env.VITE_APP_REGION,
//     credentials: {
//       accessKeyId: import.meta.env.VITE_APP_ACCESS,
//       secretAccessKey: import.meta.env.VITE_APP_SECRET,
//     },
//   };

//   const handleFileInput = (event) => {
//     const file = event.target.files[0];
//     setFileName(file.name);
//     setSelectedFile(file);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       toast.error('No file selected for upload.');
//       return;
//     }

//     const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
//     const uploadId = Date.now().toString();
//     const uploadInfo = {
//       id: uploadId,
//       name: fileName || selectedFile.name,
//       progress: 0,
//       attributes: selectedAttributes,
//     };

//     dispatch(addUpload(uploadInfo));
//     toast.info('File upload initialized...');
//     setUploadProgress(0);

//     try {
//       const createMultipartUploadCommand = new CreateMultipartUploadCommand({
//         Bucket: config.bucketName,
//         Key: fileName || selectedFile.name,
//         ContentType: selectedFile.type,
//       });

//       const createMultipartUploadResponse = await s3Client.send(createMultipartUploadCommand);
//       const { UploadId } = createMultipartUploadResponse;
//       const partSize = 5 * 1024 * 1024; // 5MB part size
//       const parts = [];
//       const fileSize = selectedFile.size;

//       for (let partNumber = 1, start = 0; start < fileSize; partNumber++, start += partSize) {
//         const end = Math.min(start + partSize, fileSize);
//         const filePart = selectedFile.slice(start, end);

//         let part;
//         let attempts = 0;
//         const maxRetries = 3;
//         while (attempts < maxRetries) {
//           try {
//             const uploadPartCommand = new UploadPartCommand({
//               Bucket: config.bucketName,
//               Key: fileName || selectedFile.name,
//               PartNumber: partNumber,
//               UploadId,
//               Body: filePart,
//             });

//             part = await s3Client.send(uploadPartCommand);
//             break;
//           } catch (error) {
//             attempts++;
//             if (attempts === maxRetries) {
//               throw new Error(`Failed to upload part ${partNumber} after ${maxRetries} attempts`);
//             }
//             console.error(`Retrying part ${partNumber} (${attempts}/${maxRetries})`);
//           }
//         }

//         parts.push({ ETag: part.ETag, PartNumber: partNumber });
//         const progress = Math.round((end / fileSize) * 100);
//         setUploadProgress(progress);
//         dispatch(updateUploadProgress({ id: uploadId, progress }));
//       }

//       const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
//         Bucket: config.bucketName,
//         Key: fileName || selectedFile.name,
//         UploadId,
//         MultipartUpload: { Parts: parts },
//       });

//       await s3Client.send(completeMultipartUploadCommand);
//       toast.success('File successfully uploaded!');
//       setUploadProgress(0);
//       setSelectedFile(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       toast.error(`Error uploading file: ${error.message}`);
//       dispatch(updateUploadProgress({ id: uploadId, progress: 0 }));
//     }
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         File Upload
//       </Typography>

//       {/* <TextField
//         label="File Name"
//         value={fileName}
//         onChange={(e) => setFileName(e.target.value)}
//         fullWidth
//         margin="normal"
//       /> */}

//       <TextField
//         label="File Name"
//         value={fileName}
//         onChange={(e) => setFileName(e.target.value)}
//         fullWidth
//         // Change 'margin' to 'dense' or 'none'
//         margin="dense" // or remove this line if no margin adjustment is needed
//       />

//       {/* <Select
//         multiple
//         value={selectedAttributes}
//         onChange={(e) => setSelectedAttributes(e.target.value)}
//         displayEmpty
//         fullWidth
//         margin="normal"
//         renderValue={(selected) =>
//           selected.length ? selected.join(', ') : 'Select attributes'
//         }
//       >
//         <MenuItem value="attribute1">Attribute 1</MenuItem>
//         <MenuItem value="attribute2">Attribute 2</MenuItem>
//         <MenuItem value="attribute3">Attribute 3</MenuItem>
//       </Select> */}

//       <Select
//         multiple
//         value={selectedAttributes}
//         onChange={(e) => setSelectedAttributes(e.target.value)}
//         displayEmpty
//         fullWidth
//         // Change 'margin' to 'dense' or 'none'
//         margin="dense" // or remove this line if no margin adjustment is needed
//         renderValue={(selected) =>
//           selected.length ? selected.join(', ') : 'Select attributes'
//         }
//       >
//         <MenuItem value="attribute1">Attribute 1</MenuItem>
//         <MenuItem value="attribute2">Attribute 2</MenuItem>
//         <MenuItem value="attribute3">Attribute 3</MenuItem>
//       </Select>

//       <Box
//         sx={{
//           border: '2px dashed #ccc',
//           borderRadius: 1,
//           padding: 2,
//           marginY: 2,
//           textAlign: 'center',
//         }}
//       >
//         <input
//           type="file"
//           onChange={handleFileInput}
//           style={{ display: 'none' }}
//           id="file-input"
//         />
//         <label htmlFor="file-input">
//           <Button variant="contained" component="span">
//             Click or drag file to this area to upload
//           </Button>
//         </label>
//       </Box>

//       {uploadProgress > 0 && (
//         <Box sx={{ marginY: 2 }}>
//           <LinearProgress variant="determinate" value={uploadProgress} />
//           <Typography variant="body2" sx={{ marginTop: 1 }}>
//             Progress: {uploadProgress}%
//           </Typography>
//         </Box>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleUpload}
//         disabled={!selectedFile || isUploading}
//       >
//         Upload File
//       </Button>
//     </Box>
//   );
// };

// export default UploadPage;
