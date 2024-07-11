import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { TemplateData } from '../../assets/dataAsset/dataTemplateData';
import TemplateCards from '../cards/templateCards';

const StepTwo = () => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField('templateId');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [hoveredTemplate, setHoveredTemplate] = useState(null);

    const handleClick = (data) => {
        setFieldValue('templateId', data.id);
        setSelectedTemplate(data.id);
        console.log(data.id);
    };

    const handleMouseEnter = (id) => {
        setHoveredTemplate(id);
    };

    const handleMouseLeave = () => {
        setHoveredTemplate(null);
    };

    return (
        <Box>
            {/* <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Recently Used
            </Typography> */}

            {/* <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                {TemplateData.recent.map((data) => (
                    <Grid
                        item
                        xs={3}
                        key={data.id}
                        onClick={() => handleClick(data)}
                        onMouseEnter={() => handleMouseEnter(data.id)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            cursor: "pointer",
                            border: selectedTemplate === data.id ? '2px solid #009688' : '1px solid #e0e0e0',
                            boxShadow: hoveredTemplate === data.id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                            padding: 2,
                            backgroundColor: 'white',
                        }}
                    >
                        <TemplateCards data={data} />
                    </Grid>
                ))}
            </Grid> */}

            {/* <Divider sx={{ marginBottom: 2 }} /> */}

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Available Templates
            </Typography>

            <Grid container spacing={2} columnGap={2} >
                {TemplateData.data.map((data) => (
                    <Grid
                        item
                        xs={3.5}
                        key={data.id}
                        onClick={() => handleClick(data)}
                        onMouseEnter={() => handleMouseEnter(data.id)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            cursor: "pointer",
                            border: selectedTemplate === data.id ? '2px solid #009688' : '1px solid #e0e0e0',
                            boxShadow: hoveredTemplate === data.id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                            padding: 2,
                            backgroundColor: 'white',
                            // marginRight:"2%"
                        }}
                    >
                        <TemplateCards data={data} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StepTwo;
