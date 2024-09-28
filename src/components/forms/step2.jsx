import React, { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Box, Grid, Typography, CircularProgress } from '@mui/material'; // Added CircularProgress for loading spinner
import TemplateAPIs from '../../utilities/api/templates/templateAPI';
import TemplateCards from '../cards/templateCards';

const StepTwo = () => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField('templateId');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [hoveredTemplate, setHoveredTemplate] = useState(null);
    const [templates, setTemplates] = useState([]); // State to store fetched templates
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch the list of templates from the API
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const data = await TemplateAPIs.getList();
                setTemplates(data); // Store fetched templates in state
            } catch (error) {
                console.error('Error fetching templates:', error);
                setError('Failed to fetch templates. Please try again later.'); // Set user-friendly error message
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const handleClick = (data) => {
        setFieldValue('templateId', data.id);
        setSelectedTemplate(data.id);
        console.log('Selected Template ID:', data.id);
    };

    const handleMouseEnter = (id) => {
        setHoveredTemplate(id);
    };

    const handleMouseLeave = () => {
        setHoveredTemplate(null);
    };

    // Display loading spinner while templates are being fetched
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading templates...</Typography>
            </Box>
        );
    }

    // Display error message if fetching templates fails
    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Available Templates
            </Typography>

            <Grid container spacing={2} columnGap={2}>
                {templates.map((data) => (
                    <Grid
                        item
                        xs={3.5}
                        key={data.id}
                        onClick={() => handleClick(data)}
                        onMouseEnter={() => handleMouseEnter(data.id)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            cursor: 'pointer',
                            border: selectedTemplate === data.id ? '2px solid #009688' : '1px solid #e0e0e0',
                            boxShadow: hoveredTemplate === data.id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                            padding: 2,
                            backgroundColor: 'white',
                            transition: 'border 0.3s ease, box-shadow 0.3s ease', // Smooth transition
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
