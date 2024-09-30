import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostgresConfigModal from './PostgresConfigModal';
import PostgresIcon from '../../assets/images/postgresql.png'; // Assuming this is for the Postgres image
import SQLIcon from '../../assets/images/sql.png'; // Assuming this is for the SQL image

const AddDatabase = () => {
  const [isPostgresModalOpen, setPostgresModalOpen] = useState(false);

  // Open Postgres modal
  const handleOpenPostgresModal = () => {
    setPostgresModalOpen(true);
  };

  // Close Postgres modal
  const handleClosePostgresModal = () => {
    setPostgresModalOpen(false);
  };

  return (
    <>
      <Box sx={{
        padding: { xs: 2, sm: 4 },  // Adjust padding based on screen size
        maxWidth: { xs: '100%', sm: 400 },  // Full width on small screens, 400px max on larger
        border: '1px solid #ddd', 
        borderRadius: '12px', 
        textAlign: 'center', 
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
        margin: 'auto'  // Center the modal content on small screens
      }}>
        <TextField
          fullWidth
          placeholder="Search for a database"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          variant="outlined"
          sx={{ mb: 3, borderRadius: '50px' }}
        />
        
        {/* Database buttons in a grid */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={4}>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ padding: '16px', borderRadius: '12px' }} 
              startIcon={<img src={PostgresIcon} alt="Postgres" style={{ width: '40px', height: '40px' }} />}  
              onClick={handleOpenPostgresModal} // Open Postgres modal on click
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ padding: '16px', borderRadius: '12px' }} 
              startIcon={<img src={SQLIcon} alt="SQL" style={{ width: '40px', height: '40px' }} />}  
            />
          </Grid>
        </Grid>

        {/* Footer buttons */}
        <Button 
          variant="contained" 
          sx={{ mt: 3, width: '100%', borderRadius: '50px', backgroundColor: '#00A78E' }}
        >
          See more options
        </Button>
        <Button 
          variant="text" 
          sx={{ mt: 1, width: '100%', color: '#6C757D' }}
        >
          Cancel
        </Button>
      </Box>

      {/* Postgres Modal */}
      <PostgresConfigModal open={isPostgresModalOpen} handleClose={handleClosePostgresModal} />
    </>
  );
};

export default AddDatabase;
