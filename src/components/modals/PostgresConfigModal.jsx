import React from 'react';
import { Box, Button, Grid, TextField, Typography, Switch, FormControlLabel, IconButton, Modal, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const PostgresSchema = Yup.object().shape({
  displayName: Yup.string().required('Display Name is required'),
  databaseName: Yup.string().required('Database Name is required'),
  host: Yup.string().required('Host is required'),
  username: Yup.string().required('Username is required'),
  port: Yup.number().required('Port is required').min(1, 'Port must be greater than 0'),
  password: Yup.string().required('Password is required'),
  schema: Yup.string().required('Schema is required'),
});

const PostgresConfigModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="postgres-modal-title" aria-describedby="postgres-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '600px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '12px',
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#003044',
            color: 'white',
            borderRadius: '8px 8px 0 0',
            p: 2,
            mb: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Postgres
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Formik Form */}
        <Formik
          initialValues={{
            displayName: '',
            databaseName: '',
            host: '',
            username: '',
            port: '',
            password: '',
            schema: '',
            useSSL: false,
            useSSHTunnel: false,
          }}
          validationSchema={PostgresSchema}
          onSubmit={(values) => {
            console.log('Form Data:', values);
            handleClose();
          }}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form>
              <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Display Name"
                    name="displayName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.displayName}
                    error={touched.displayName && Boolean(errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Database Name"
                    name="databaseName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.databaseName}
                    error={touched.databaseName && Boolean(errors.databaseName)}
                    helperText={touched.databaseName && errors.databaseName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Host"
                    name="host"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.host}
                    error={touched.host && Boolean(errors.host)}
                    helperText={touched.host && errors.host}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Port"
                    name="port"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.port}
                    error={touched.port && Boolean(errors.port)}
                    helperText={touched.port && errors.port}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                {/* Schemas Dropdown */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={touched.schema && Boolean(errors.schema)}>
                    <InputLabel>Schemas</InputLabel>
                    <Select
                      name="schema"
                      value={values.schema}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="custom_schema">Custom Schema</MenuItem>
                    </Select>
                    {touched.schema && errors.schema && (
                      <Typography variant="caption" color="error">
                        {errors.schema}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* SSL and SSH Options */}
                <Grid xs={12} sm={6} sx={{
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between', 
                  mt: 1, 
                  pl:4,
                }}>
                  <Grid item>
                      <FormControlLabel 
                      control={
                        <Switch
                          name="useSSL"
                          checked={values.useSSL}
                          onChange={handleChange}
                        />
                      } 
                      label="Use a secure connection (SSL)" 
                      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                      />
                  </Grid>
                  <Grid item>
                      <FormControlLabel 
                      control={
                        <Switch
                          name="useSSHTunnel"
                          checked={values.useSSHTunnel}
                          onChange={handleChange}
                        />
                      } 
                      label="Use a SSH-tunnel" 
                      sx={{ display: 'flex', width: '100%' }}
                      />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    If direct connection of your database isn’t possible, you may want to use SSH-tunnel.{' '}
                    <a href="#" style={{ color: '#00A78E', textDecoration: 'none' }}>Learn More</a>
                  </Typography>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{ width: '30%', borderColor: '#adadad', color: '#707070' }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: '30%', backgroundColor: '#00A78E' }}
                >
                  Add
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PostgresConfigModal;
