import { Box, Typography, Grid, Divider } from "@mui/material";
import { useState } from "react";
import ReportCards from "./ReportCards";

const ReportList = ({ data }) => {
    // Manage the report list in state
    const [reports, setReports] = useState(data || []);

    // Function to handle report deletion
    const handleReportDeleted = (deletedReportId) => {
        // Filter out the deleted report from the list
        setReports((prevReports) => prevReports.filter((report) => report.id !== deletedReportId));
    };

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
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <Grid item md={3} xs={6} key={report.id} sx={{ marginBottom: "3%" }}>
                            <Box sx={{ width: "80%" }}>
                                {/* Pass handleReportDeleted to ReportCards */}
                                <ReportCards data={report} onReportDeleted={handleReportDeleted} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ color: "grey", margin: "20px" }}>
                        No reports available.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default ReportList;
