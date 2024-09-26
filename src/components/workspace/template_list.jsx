import { Box, Typography, Grid, Divider } from "@mui/material";
import TemplateCards from "../cards/templateCards";

const TemplateList = ({ data }) => {
    // Check if data.templates exists and is an array
    const templates = data?.templates || [];
    
    return (
        <Box sx={{ marginLeft: "3%" }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "40%" }}>
                <Typography
                    sx={{
                        color: "primary.dark",
                        marginRight: "10px",
                        whiteSpace: "nowrap",
                        fontSize: "18px"
                    }}
                >
                    Generated Reports
                </Typography>
                <Divider sx={{ flexGrow: 1, backgroundColor: "grey", height: "0.75px" }} />
            </Box>

            <Grid sx={{ margin: "20px 0 10px 0" }} container columnSpacing={1}>
                {templates.length > 0 ? (
                    templates.map((template) => (
                        <Grid md={3} xs={6} key={template.id} sx={{ marginBottom: "3%" }}>
                            <Box sx={{ width: "80%" }}>
                                <TemplateCards data={template} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ color: "grey", margin: "20px" }}>
                        No templates available.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default TemplateList;
