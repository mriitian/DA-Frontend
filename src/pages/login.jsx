import { useFormik } from "formik";
import axios from "axios";
import { Grid, TextField, Button, Paper, Typography, Link, styled, IconButton, InputAdornment } from "@mui/material";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "../store/slices/loginSlice";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Auth_API from "../utilities/api/authApis";

const LoginContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f2f8f9',
});

const LoginPaper = styled(Paper)({
    padding: '20px',
    borderRadius: '30px',
    maxWidth: '400px',
    width: '40%',
    textAlign: 'center',
});

const Logo = styled('div')({
    marginBottom: '20px',
});

const StyledTextField = styled(TextField)({
    marginBottom: '10px',
});

const StyledButton = styled(Button)({
    marginTop: '10px',
    backgroundColor: '#a1ede2',
    color: '#000',
    '&:hover': {
        backgroundColor: '#8fdccf',
    },
    border: "1px solid #1b5e20",
    borderRadius: "10px",
    fontWeight: "bold"
});

const StyledLink = styled(Link)({
    marginTop: '10px',
    display: 'block',
    color: '#00bfa6',
});

const SignupLink = styled(Typography)({
    marginTop: '20px',
    color: '#a2acb6',
});

const ErrorText = styled(Typography)({
    marginTop: '10px',
    color: 'red',
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async (values, actions) => {
        setError(''); 
        try {
            const response = await Auth_API.login(values);
            console.log(response);
            console.log("Logged in");

            dispatch(
                loginSlice.actions.setAccountLog({
                    user: response.data.user,
                    token: response.data.access,
                    refreshToken: response.data.refresh,
                })
            );

            actions.resetForm();
            navigate('/browse-data/open-source');
        } catch (error) {
            setError('Login failed. Please check your email and password and try again.');
            console.log(error);
        }
    };

    const login_schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: login_schema,
        onSubmit,
    });

    return (
        <LoginContainer>
            <LoginPaper elevation={3}>
                <Logo>
                    <img src="../../public/login_logo.png" alt="Logo" width="40" />
                </Logo>
                <form noValidate onSubmit={handleSubmit}>
                    <StyledTextField
                        label="Email Address"
                        variant="outlined"
                        name="email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email}
                        helperText={errors.email && touched.email && errors.email}
                    />
                    <StyledTextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password && touched.password}
                        helperText={errors.password && touched.password && errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    
                    <StyledButton type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                        Login
                    </StyledButton>
                    <StyledLink href="#">Forgot password?</StyledLink>
                </form>
                <SignupLink>
                    Don't have an account yet? <Link href="/signup">Get started now</Link>
                </SignupLink>

                {error.length && (
                    <>
                        {console.log(error)}
                        <ErrorText>{error}</ErrorText>
                    </> 
                    
                )}
            </LoginPaper>
        </LoginContainer>
    );
};

export default Login;
