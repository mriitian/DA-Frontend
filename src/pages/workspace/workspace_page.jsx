import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import DataList from "../../components/workspace/data_list";
import NewReportModal from "../../components/modals/newReportModal";
import newReportModalSlice from "../../store/slices/newReportModalSlice";
import { WorkspaceData } from "../../assets/dataAsset/dataWorkspace";
import ReportAPIs from "../../utilities/api/reports/ReportAPIs";
import ReportList from "../../components/workspace/report/ReportList";
import ImportDataModal from "./ImportDataModal";

const WorkspacePage = () => {
    const [searchParams] = useSearchParams();
    const workspace_name = searchParams.get('name');

    const workspace = WorkspaceData.data;
    const data = workspace.filter((arr) => arr.name === workspace_name);

    const [reports, setReports] = useState([]); // State for storing reports
    const [loading, setLoading] = useState(true); // State for handling loading
    const [importModalOpen, setImportModalOpen] = useState(false); // State for Import Modal

    const dispatch = useDispatch();

    const buttonStyles = {
        height: '60%',
        margin: 'auto 1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        textTransform: 'none',
    };

    const handleReportClick = () => {
        dispatch(newReportModalSlice.actions.setOpen({
            open: true
        }));
    };

    const handleImportClick = () => {
        setImportModalOpen(true); // Open the import modal
    };

    const closeImportModal = () => {
        setImportModalOpen(false); // Close the import modal
    };

    // Fetch reports when component mounts
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true); // Start loading
                const response = await ReportAPIs.getList(); // Fetching reports
                console.log("Fetched reports API Response:", response);
                setReports(response); // Set the reports data from the API response
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setLoading(false); // Stop loading once done
            }
        };

        fetchReports();
    }, [workspace_name]);

    console.log("Reports:", reports);

    return (
        <Box>
            <Grid container>
                <Grid item md={5} xs={7}>
                    <Typography
                        sx={{
                            color: "grey",
                            fontWeight: 550,
                            margin: "15px 2%",
                            fontSize: "20px"
                        }}
                    >
                        {workspace_name}
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={7}
                    xs={3}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        sx={buttonStyles}
                        onClick={handleReportClick}
                        variant="contained"
                        color="primary"
                        startIcon={
                            <AddIcon
                                sx={{
                                    border: "1px solid white",
                                    borderRadius: "5px",
                                    height: "18px",
                                    width: "90%"
                                }}
                            />
                        }
                    >
                        <Typography variant="body2">
                            New Report
                        </Typography>
                    </Button>

                    <Button
                        sx={buttonStyles}
                        onClick={handleImportClick} // Open import modal on click
                        variant="contained"
                        color="primary"
                        startIcon={
                            <AddIcon
                                sx={{
                                    border: "1px solid white",
                                    borderRadius: "5px",
                                    height: "18px",
                                    width: "90%"
                                }}
                            />
                        }
                    >
                        <Typography variant="body2">
                            Import Data
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

            <DataList data={data[0]} />

            {/* Show loading indicator or reports */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <ReportList data={reports} />
            )}

            <NewReportModal />
            <ImportDataModal open={importModalOpen} onClose={closeImportModal} /> {/* Include Import Modal */}
        </Box>
    );
};

export default WorkspacePage;
