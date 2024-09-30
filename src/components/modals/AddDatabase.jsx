import React from 'react';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// Import the uploaded images
import PostgresIcon from '../../assets/images/postgresql.png'; // Assuming this is for the Postgres image
// import CsvIcon from '../../assets/images/csv.png'; // Assuming this is for the CSV image
import SQLIcon from '../../assets/images/sql.png'; // Assuming this is for the CSV image

const AddDatabase = ({ handleClose }) => {
  return (
    <Box sx={{
      padding: { xs: 2, sm: 4 },  // Adjust padding based on screen size
      // width: '100%', 
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
            startIcon={<img src={PostgresIcon} alt="Postgres" style={{ width: '40px', height: '40px' }} />}  // Use Postgres image
          />
        </Grid>
        {/* <Grid item xs={6} sm={4}>
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ padding: '16px', borderRadius: '12px' }} 
            startIcon={<img src={CsvIcon} alt="CSV" style={{ width: '40px', height: '40px' }} />}  // Use CSV image
          />
        </Grid> */}
        <Grid item xs={6} sm={4}>
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ padding: '16px', borderRadius: '12px' }} 
            startIcon={<img src={SQLIcon} alt="CSV" style={{ width: '40px', height: '40px' }} />}  // Use CSV image
          />
        </Grid>
        {/* Add the rest of your buttons */}
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
        onClick={handleClose}  // Add the onClick handler for closing the modal
      >
        Cancel
      </Button>
    </Box>
  );
};

export default AddDatabase;


// import React from 'react';
// import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import PostgresIcon from '@mui/icons-material/Storage';  // Use custom icons here
// import RedshiftIcon from '@mui/icons-material/Storage';  // Use custom icons here
// import CsvIcon from '@mui/icons-material/Description';
// import SqlServerIcon from '@mui/icons-material/Storage';  // Use custom icons here
// import BigQueryIcon from '@mui/icons-material/Storage';  // Use custom icons here
// import MySQLIcon from '@mui/icons-material/Storage';  // Use custom icons here

// const AddDatabase = ({ handleClose }) => {
//   return (
//     <Box sx={{
//       padding: { xs: 2, sm: 4 },  // Adjust padding based on screen size
//       width: '100%', 
//       maxWidth: { xs: '100%', sm: 400 },  // Full width on small screens, 400px max on larger
//       border: '1px solid #ddd', 
//       borderRadius: '12px', 
//       textAlign: 'center', 
//       boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
//       margin: 'auto'  // Center the modal content on small screens
//     }}>
//       <TextField
//         fullWidth
//         placeholder="Search for a database"
//         InputProps={{
//           endAdornment: (
//             <IconButton>
//               <SearchIcon />
//             </IconButton>
//           ),
//         }}
//         variant="outlined"
//         sx={{ mb: 3, borderRadius: '50px' }}
//       />
      
//       {/* Database buttons in a grid */}
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={6} sm={4}>
//           <Button 
//             variant="outlined" 
//             fullWidth 
//             sx={{ padding: '16px', borderRadius: '12px' }} 
//             startIcon={<PostgresIcon sx={{ fontSize: '40px' }} />}
//           />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <Button 
//             variant="outlined" 
//             fullWidth 
//             sx={{ padding: '16px', borderRadius: '12px' }} 
//             startIcon={<RedshiftIcon sx={{ fontSize: '40px' }} />}
//           />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <Button 
//             variant="outlined" 
//             fullWidth 
//             sx={{ padding: '16px', borderRadius: '12px' }} 
//             startIcon={<CsvIcon sx={{ fontSize: '40px' }} />}
//           />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <Button 
//             variant="outlined" 
//             fullWidth 
//             sx={{ padding: '16px', borderRadius: '12px' }} 
//             startIcon={<SqlServerIcon sx={{ fontSize: '40px' }} />}
//           />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <Button 
//             variant="outlined" 
//             fullWidth 
//             sx={{ padding: '16px', borderRadius: '12px' }} 
//             startIcon={<BigQueryIcon sx={{ fontSize: '40px' }} />}
//           />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <Button 
//             variant="outlined" 
//             fullWidth 
//             sx={{ padding: '16px', borderRadius: '12px' }} 
//             startIcon={<MySQLIcon sx={{ fontSize: '40px' }} />}
//           />
//         </Grid>
//       </Grid>

//       {/* Footer buttons */}
//       <Button 
//         variant="contained" 
//         sx={{ mt: 3, width: '100%', borderRadius: '50px', backgroundColor: '#00A78E' }}
//       >
//         See more options
//       </Button>
//       <Button 
//         variant="text" 
//         sx={{ mt: 1, width: '100%', color: '#6C757D' }}
//         onClick={handleClose}  // Add the onClick handler for closing the modal
//       >
//         Cancel
//       </Button>
//     </Box>
//   );
// };

// export default AddDatabase;
