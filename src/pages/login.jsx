import { useFormik } from "formik";
import axios from "axios";
import {Grid,Container,TextField,Button} from "@mui/material";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "../store/loginSlice";

const Login = () => {
    const baseURL = `https://staging.hypadmin.marketgpt.ai/api/`;
    const dispatch = useDispatch();

    const token = useSelector(state => state.signup.token);

    const onSubmit = async (values,actions) => {

        console.log(values);
        try{
            const response = await axios.post(baseURL+'auth/login/',values,{
                
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                
            });

            dispatch(loginSlice.actions.setAccountLog({
                user:response.data.user,
                token:response.data.access,
                refreshToken:response.data.refresh
            }))
            
            console.log("Login Done");
            actions.resetForm();
            
            console.log(response);

        }catch(error){
            console.log(error);
        }
        
    }

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
        isSubmitting

    } = useFormik({
        initialValues:{
            email: "",
            password: ""
        },

        validationSchema: login_schema,
        onSubmit

    })

    return ( 
        <>
            <Container>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    
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
                    
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    // sx={classes.buttonStyle}
                    disabled={isSubmitting}
                >
                    Login
                </Button>
                </form>
            </Container>
        </>
    );
}
 
export default Login;