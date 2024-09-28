import React, { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import DataCards from '../cards/dataCards';
import DataSelectModal from '../modals/dataSelectModal';

const StepOne = () => {
    const { values, setFieldValue } = useFormikContext();
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
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ marginBottom: '16px', ml: 7 }}
                    />
                </Grid>
            </Grid>
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
                        sx={{ marginBottom: '16px' }}
                    />
                    </Grid>
            </Grid>
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

            {datasources && (
                <Grid container spacing={2}>
                    {datasources.map((data) => (
                        <Grid item md={3} xs={3} key={data.id}>
                            <DataCards data={data} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <DataSelectModal open={dataOpen} setOpen={setDataOpen} data={datasources} setData={setDatasources} />
        </Box>
    );
};

export default StepOne;
