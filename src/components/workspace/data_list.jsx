import { Box, Typography, Grid, Divider } from "@mui/material";
import DataCards from "../cards/dataCards";

const DataList = ({ data }) => {
    return (
        <Box sx={{
            marginLeft: "3%",
            marginBottom: "2%"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                width: "40%"
            }}>
                <Typography sx={{
                    color: "primary.dark",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    fontSize: "18px"
                }}>
                    Your Data
                </Typography>
                <Divider sx={{ flexGrow: 1, backgroundColor: "grey", height: "0.75px" }} />
            </Box>

            <Grid
                sx={{
                    marginTop: "1%",
                }}
                container
            >
                {data.datasources.map((datasource) => (
                    <Grid item md={3} xs={6} key={datasource.id}>
                        <DataCards data={datasource} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DataList;
