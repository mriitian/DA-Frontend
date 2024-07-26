import { useFormik } from "formik";
import axios from "axios";
import { Grid, Container, TextField, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import signupSlice from "../store/slices/signupSlice";
import Auth_API from "../utilities/api/authApis";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const baseURL = import.meta.env.VITE_HOST_HOST_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const onSubmit = async (values, actions) => {
        setServerError('');
        try {
            const response = await Auth_API.register(values);
            dispatch(signupSlice.actions.setAccount({
                user: response.data.user,
                token: response.data.token,
                refreshToken: response.data.refresh
            }));
            actions.resetForm();
            navigate('/login');
        } catch (error) {
            setServerError(error.response?.data?.message || 'An error occurred');
        }
    }

    const signup_schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
        name: yup.string().required('Name is required'),
        phone_number: yup.string()
                        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
                        .required('Phone number is required'),
    });

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting

    } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            name: "",
            phone_number: ""
        },
        validationSchema: signup_schema,
        onSubmit
    })

    return (
        <Container 
            sx={{
                border:"1px solid black",
                borderRadius: '30px',
                marginTop:"3%",
                padding:"2%"
            }} 
            maxWidth="xs"
        >
            <form noValidate onSubmit={handleSubmit}>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <Grid container spacing={2}>
                    {serverError && (
                        <Grid item xs={12}>
                            <Typography color="error" variant="body2">
                                {serverError}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            name="username"
                            fullWidth
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.username && touched.username}
                            helperText={errors.username && touched.username ? errors.username : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email && touched.email}
                            helperText={errors.email && touched.email ? errors.email : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            fullWidth
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password && touched.password}
                            helperText={errors.password && touched.password ? errors.password : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            fullWidth
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            name="phone_number"
                            fullWidth
                            value={values.phone_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.phone_number && touched.phone_number}
                            helperText={errors.phone_number && touched.phone_number ? errors.phone_number : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Signup;
