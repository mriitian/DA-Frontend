import React, { useState } from 'react';
import { Modal, Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import newReportModalSlice from '../../store/slices/newReportModalSlice';
import StepOne from '../forms/step1';
import StepTwo from '../forms/step2';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportDatasourceSlice from '../../store/slices/report_datasources';
import ReportModal_API from '../../utilities/api/reportModalApis';

const NewReportModal = () => {
    const steps = ['Step 1: Choose Data', 'Step 2: Choose Template'];
    const [activeStep, setActiveStep] = useState(0);
    const [submitError, setSubmitError] = useState(''); // State for submission errors
    const open = useSelector(state => state.report_modal.open);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentURL = useLocation().pathname;

    const token = useSelector(state => state.login.token);
    const user = useSelector(state => state.login.user);

    const handleClose = () => {
        dispatch(newReportModalSlice.actions.setOpen({ open: false }));
    };

    const handleNext = () => {
        if (!formik.isValid) {
            formik.validateForm();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSubmitError(''); // Clear submission error when moving to next step
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async (values) => {
        console.log(values);

        const report_name = values.name;
        const description = values.description;
        const owner = user.username;
        const nodes = [];
        const template = [values.templateId];
        const datasources = values.attachedData;

        try {
            const response = await ReportModal_API.createReport({
                accessToken: token,
                report_name: report_name,
                owner: user.username,
                nodes: [],
                users_access: [],
                template: template,
                datasources: datasources
            });

            console.log(response);

            setActiveStep(0);
            handleClose();
            navigate(`/report/${response.id}/edit/`);

        } catch (err) {
            console.error('Submission Error:', err);
            setSubmitError('Failed to create the report. Please try again.'); // Set submission error
        }

    };

    const handleBlankClick = async () => {
        const report_name = formik.values.name || 'Untitled Report';  // Default to 'Untitled Report' if name is not provided
        const description = formik.values.description || '';
        const owner = user.username;
        const nodes = [];
        const template = [];
        const datasources = formik.values.attachedData;
    
        try {
            // Make a post request to create a new report with a blank setup
            const response = await ReportModal_API.createReport({
                accessToken: token,
                report_name: report_name,
                owner: owner,
                nodes: [],
                users_access: [],
                template: template,
                datasources: datasources
            });
    
            console.log(response); // Log the response for debugging purposes
    
            // Store the selected datasources in redux state before navigating
            dispatch(ReportDatasourceSlice.actions.setDatasources({
                datasources: formik.values.attachedData
            }));
    
            // Navigate to the new report edit page using the report ID from the response
            navigate(`/report/${response.id}/edit/`);
            handleClose(); // Close the modal after navigation
    
        } catch (err) {
            console.error('Error creating a blank report:', err);
            setSubmitError('Failed to create a blank report. Please try again.');
        }
    };    

    // Validation schema for each step
    const validationSchema = [
        Yup.object({
            name: Yup.string()
                .required('Please enter a report name. This field cannot be left blank.')
                .min(3, 'Report name must be at least 3 characters long.'),
            description: Yup.string()
                .required('Please provide a description for your report. This field is mandatory.')
                .min(10, 'Description must be at least 10 characters long.'),
            // attachedData: Yup.array()
            //     .min(1, 'You must select at least one data source to proceed.'),
        }),
        // Yup.object({
        //     templateId: Yup.string()
        //         .required('Please choose a template to create your report.'),
        // }),
    ];

    // Initial form values
    const initialValues = {
        name: '',
        description: '',
        attachedData: [],
        templateId: ''
    };

    // Formik setup
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema[activeStep], // Dynamic validation schema based on active step
        onSubmit: handleSubmit,
        validateOnMount: true, // Validate form on mount to disable Next button if invalid
        enableReinitialize: true
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 500, fontSize: '24px', mb: 2.5 }}>
                    Create Report
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        {/* Step One */}
                        {activeStep === 0 && <StepOne />}
                        {/* Step Two */}
                        {activeStep === 1 && <StepTwo />}
                        {/* Submission Error */}
                        {submitError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {submitError}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === steps.length - 1 ? (
                                <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    sx={{ border: '1px solid green' }}
                                    onClick={handleNext}
                                    disabled={!formik.isValid || formik.isSubmitting}
                                >
                                    Choose Template
                                </Button>
                            )}
                            <Button onClick={handleBlankClick} sx={{ border: '1px solid black', color: 'black', marginLeft: '1%' }}>
                                Start from Blank
                            </Button>
                        </Box>
                    </form>
                </FormikProvider>
            </Box>
        </Modal>
    );
};

export default NewReportModal;
