import React from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Use an appropriate icon for the file upload

const AddCsvExcelModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="file-upload-modal-title" aria-describedby="file-upload-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '400px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '12px',
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* Modal Header */}

        <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 500,
            textAlign: 'center',
            color: '#003044',
            marginBottom: 3,
        }}>
            Add your data
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#003044',
            color: 'white',
            borderRadius: 3,
            p: 1,
            mb: 4,
          }}
        >
          <Typography variant="h6">
            Upload CSV/Excel
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          {/* Display Name Field */}
          <Grid item xs={12}>
          <Typography sx={{
                fontWeight: 500,
                color: '#707070',
                marginBottom: 1,
            }}>
                Display Name
          </Typography>
            <TextField
              fullWidth
            //   label="Display Name"
              placeholder="Enter display name"
              name="displayName"
              variant="outlined"
            />
          </Grid>

          {/* File Upload Field */}
          <Grid item xs={12}>
          <Typography sx={{
                fontWeight: 500,
                color: '#707070',
                marginBottom: 1,
            }}>
                Choose File
          </Typography>
            <TextField
              fullWidth
            //   label="Choose File"
              name="file"
              placeholder="Choose File from your device"
              variant="outlined"
              multiline
              rows={2}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <UploadFileIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: '45%', borderColor: '#adadad', color: '#707070' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: '45%', backgroundColor: '#00A78E' }}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCsvExcelModal;
