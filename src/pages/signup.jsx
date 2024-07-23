import { useFormik } from "formik";
import axios from "axios";
import {Grid,Container,TextField,Button} from "@mui/material";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import signupSlice from "../store/signupSlice";

const Signup = () => {
    const baseURL = import.meta.env.VITE_HOST_HOST_URL;
    const dispatch = useDispatch();

    const onSubmit = async (values,actions) => {

        console.log(values);
        try{
            const response = await axios.post(baseURL+'auth/register/',values);

            dispatch(signupSlice.actions.setAccount({
                user:response.data.user,
                token:response.data.token,
                refreshToken:response.data.refresh
            }))
    
            console.log("Signup Done");
            // navigate("/login")
            actions.resetForm();
            
            console.log(response);
        }catch(error){
            console.log(error);
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
        initialValues:{
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
        <>
            <Container>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        fullWidth
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // sx={classes.textField}
                        error={errors.username && touched.username}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // sx={classes.textField}
                        error={errors.email && touched.email}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="password"
                        variant="outlined"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // sx={classes.textField}
                        error={errors.password && touched.password}
                        // fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // sx={classes.textField}
                        error={errors.name && touched.name}
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        name="phone_number"
                        // type="email"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // sx={classes.textField}
                        error={errors.phone_number && touched.phone_number}
                        // fullWidth
                    />
                    </Grid>
                    
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    // sx={classes.buttonStyle}
                    disabled={isSubmitting}
                >
                    Sign Up
                </Button>
                </form>
            </Container>
        </>
    );
}
 
export default Signup;