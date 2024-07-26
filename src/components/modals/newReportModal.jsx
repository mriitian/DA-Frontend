import React, { useState } from 'react';
import { Modal, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import newReportModalSlice from '../../store/slices/newReportModalSlice';
import StepOne from '../forms/step1';
import StepTwo from '../forms/step2';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportDatasourceSlice from '../../store/slices/report_datasources';

const NewReportModal = () => {
    const steps = ['Choose Data', 'Choose Template'];
    const [activeStep, setActiveStep] = useState(0);
    const open = useSelector(state => state.report_modal.open);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentURL = useLocation().pathname;

    const handleClose = () => {
        dispatch(newReportModalSlice.actions.setOpen({ open: false }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = (values) => {
        // Make your post request here
        console.log(values);
        // Example: axios.post('/api/report', values);
        setActiveStep(0);
        handleClose();
    };

    const handleBlankClick = () => {

        dispatch(ReportDatasourceSlice.actions.setDatasources({
            datasources: formik.values.attachedData
        }));
        navigate('/report/edit');

        console.log(formik.values);
    };

    const validationSchema = [
        Yup.object({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            attachedData: Yup.array().min(1, 'At least one data source is required')
        }),
        Yup.object({
            templateId: Yup.string().required('Required')
        })
    ];

    const initialValues = {
        name: '',
        description: '',
        attachedData: [],
        templateId: ''
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema[activeStep],
        onSubmit: handleSubmit
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
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        {activeStep === 0 && <StepOne />}
                        {activeStep === 1 && <StepTwo />}
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
                                <Button type="submit" disabled={formik.isSubmitting}>
                                    Submit
                                </Button>
                            ) : (
                                <Button sx={{ border: "1px solid green" }} onClick={handleNext}>
                                    Choose Template
                                </Button>
                            )}
                            <Button onClick={handleBlankClick} sx={{ border: "1px solid black", color: "black", marginLeft: "1%" }}>
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
