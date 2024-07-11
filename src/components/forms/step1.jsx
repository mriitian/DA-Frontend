import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import DataCards from '../cards/dataCards';
import { styled } from '@mui/material/styles';

const StepOne = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleFileChange = (e) => {
        const newData = { id: Date.now().toString(), name: e.target.files[0].name };
        console.log(newData);
        setFieldValue('attachedData', [...values.attachedData, newData]);
        console.log(values);
    };

    const handleAddData = () => {
        const newData = { id: Date.now().toString(), name: 'New Data Source' };
        setFieldValue('attachedData', [...values.attachedData, newData]);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Name
            </Typography>
            <Field
                name="name"
                as={TextField}
                label="Enter report name"
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                    marginBottom: '16px',
                }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Description
            </Typography>
            <Field
                name="description"
                as={TextField}
                label="Enter report description......"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                sx={{
                    marginBottom: '16px',
                }}
            />
            <Grid container alignItems="center" sx={{ marginTop: '16px', marginBottom: '16px' }}>
                <Grid item xs={8}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Attached Data
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: '#009688',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#00796b',
                            },
                        }}
                    >
                        + Add Data
                        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {values.attachedData.map((data) => (
                    <Grid item xs={3} key={data.id}>
                        <DataCards data={data} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StepOne;
