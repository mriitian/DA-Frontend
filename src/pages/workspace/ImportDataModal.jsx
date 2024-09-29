// ImportDataModal.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";

const ImportDataModal = ({ open, onClose }) => {
  // Function to handle data import (can be expanded for actual file handling)
  const handleImport = () => {
    // Implement import logic here, e.g., file upload API call
    console.log("Importing data...");
    onClose(); // Close the modal after importing
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Import Data</Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            Please select the file you want to import:
          </Typography>
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            inputProps={{ accept: ".csv, .xlsx" }} // Restrict file types if needed
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleImport} color="primary" variant="contained">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDataModal;
