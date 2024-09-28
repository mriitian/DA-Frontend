import React, { useEffect, useState } from 'react';
import { Field, useFormikContext, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import DataCards from '../cards/dataCards';
import DataSelectModal from '../modals/dataSelectModal';

const StepOne = () => {
    const { values, setFieldValue, errors, touched } = useFormikContext(); // Added errors and touched for error handling
    const [dataOpen, setDataOpen] = useState(false);
    const [datasources, setDatasources] = useState([]);

    useEffect(() => {
        if (datasources.length !== 0) {
            const arr = datasources.map((obj) => obj.id);
            setFieldValue('attachedData', arr);
        }
    }, [datasources, setFieldValue]);

    const handleDataClick = () => {
        setDataOpen(true);
    };

    return (
        <Box>
            {/* Report Name Field */}
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Name
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Field
                        name="name"
                        as={TextField}
                        label="Enter report name"
                        // fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: '8px', ml: 7, width:'95%' }}
                        error={touched.name && Boolean(errors.name)} // Highlight field on error
                        helperText={touched.name && errors.name ? errors.name : null} // Show error message
                    />
                </Grid>
            </Grid>

            {/* Report Description Field */}
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Description
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Field
                        name="description"
                        as={TextField}
                        label="Enter report description..."
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{ marginBottom: '8px' }}
                        error={touched.description && Boolean(errors.description)} // Highlight field on error
                        helperText={touched.description && errors.description ? errors.description : null} // Show error message
                    />
                </Grid>
            </Grid>

            {/* Attached Data Section */}
            <Grid container alignItems="center" sx={{ marginTop: '16px', marginBottom: '16px' }}>
                <Grid item xs={8}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Attached Data
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        onClick={handleDataClick}
                        sx={{
                            backgroundColor: '#009688',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#00796b',
                            },
                        }}
                    >
                        Add Data
                    </Button>
                </Grid>
            </Grid>

            {/* Show Attached Data Cards */}
            {datasources.length > 0 && (
                <Grid container spacing={2}>
                    {datasources.map((data) => (
                        <Grid item md={3} xs={6} key={data.id}>
                            <DataCards data={data} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Display Error for Attached Data */}
            {touched.attachedData && errors.attachedData && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.attachedData}
                </Typography>
            )}

            {/* Data Selection Modal */}
            <DataSelectModal open={dataOpen} setOpen={setDataOpen} data={datasources} setData={setDatasources} />
        </Box>
    );
};

export default StepOne;
