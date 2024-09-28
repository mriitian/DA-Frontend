import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import DataList from "../../components/workspace/data_list";
// import TemplateList from "../../components/workspace/template_list"; // Consider renaming this if needed
import NewReportModal from "../../components/modals/newReportModal";
import newReportModalSlice from "../../store/slices/newReportModalSlice";
import { WorkspaceData } from "../../assets/dataAsset/dataWorkspace";
import ReportAPIs from "../../utilities/api/reports/ReportAPIs";
import ReportList from "../../components/workspace/report/ReportList";

const WorkspacePage = () => {
    const [searchParams] = useSearchParams();
    const workspace_name = searchParams.get('name');

    const workspace = WorkspaceData.data;
    const data = workspace.filter((arr) => arr.name === workspace_name);
    console.log("Workspace data:", data);

    const [reports, setReports] = useState([]); // State for storing reports

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

    // Fetch reports when component mounts
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await ReportAPIs.getList(); // Fetching reports instead of templates
                setReports(response); // Set the reports data from the API response
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            }
        };

        fetchReports();
    }, []);

    console.log("Reports:", reports);

    return (
        <Box>
            <Grid container>
                <Grid item md={5} xs={7}>
                    <Typography
                        sx={{
                            color: "grey",
                            fontWeight: 550,
                            // fontFamily: "sans-serif",
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
            {/* Pass fetched reports to the TemplateList component */}
            {/* <TemplateList data={reports} />  */}
            <ReportList data={reports} />

            <NewReportModal />
        </Box>
    );
};

export default WorkspacePage;
