const NewReport = () => {
    const onSubmit = async (values,actions) => {
        try{
           
            const response = await axios.post(baseURL+'/register/',values);
    
            console.log("Signup Done");
            navigate("/login")
            actions.resetForm();
            
        }catch(error){
            console.log(error);
        }
        
    }
    const {
        values,handleBlur,handleChange,errors,touched,handleSubmit,isSubmitting

    } = useFormik({
        initialValues:{
            name: "",
            description: "",
        },

        // validationSchema: signup_schema,
        onSubmit

    })

    return ( 
        <>
            <Container sx={classes.root}>
                
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Enter report name"
                        variant="outlined"
                        name="name"
                        fullWidth
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        name="description"
                        fullWidth
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={classes.buttonStyle}
                    disabled={isSubmitting}
                >
                    Sign Up
                </Button>
                </form>
            </Container>
        </>
    );
}
 
export default NewReport;