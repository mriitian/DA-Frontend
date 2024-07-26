import TemplateCards from "../../components/cards/templateCards";
import { Grid,Box,Button, Typography } from "@mui/material";
import { TemplateData } from "../../assets/dataAsset/dataTemplateData";
import { useParams, useSearchParams } from "react-router-dom";
import DataList from "../../components/workspace/data_list";
import { WorkspaceData } from "../../assets/dataAsset/dataWorkspace";
import TemplateList from "../../components/workspace/template_list";
import { useDispatch } from "react-redux";
import newReportModalSlice from "../../store/slices/newReportModalSlice";
import NewReportModal from "../../components/modals/newReportModal";

import AddIcon from '@mui/icons-material/Add';

const WorkspacePage = () => {
    const [searchParams] = useSearchParams();
    const workspace_name = searchParams.get('name');

    const workspace = WorkspaceData.data;
    const data = workspace.filter((arr)=>arr.name == workspace_name);
    
    const dispatch = useDispatch(); 

    const buttonStyles = {
        // width: '34%',
        height: '60%',
        margin: 'auto 1%',
        // padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        textTransform: 'none',
    }

    const handleReportClick = () =>{
        console.log('asf');
        dispatch(newReportModalSlice.actions.setOpen({
            open:true
        }));
    }

    return ( 
        <Box>
            <Grid container>
                <Grid md="5" xs="7">
                    <Typography
                        
                        sx={{
                            color: "grey",
                            fontWeight: "550",
                            fontFamily: "sans-serif",
                            margin: "15px 2%",
                            fontSize: "20px"
                        }}
                    >
                        {workspace_name}
                    </Typography>
                </Grid>
                <Grid 
                    md="7"
                    xs="3"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >

                    {/* <Button variant="contained" sx={{ marginRight: '10px' }} onClick={handleReportClick}>
                        New Report
                    </Button>
                    <Button variant="contained">
                        Import Data
                    </Button> */}

                    <Button
                        sx={buttonStyles}
                        onClick={handleReportClick}
                        variant="contained"
                        color="primary"
                        startIcon={
                            <AddIcon  
                                sx={{
                                    border:"1px solid white",
                                    borderRadius:"5px",
                                    height:"18px",
                                    width:"90%"
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
                                    border:"1px solid white",
                                    borderRadius:"5px",
                                    height:"18px",
                                    width:"90%"
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
            <DataList data={data[0]}/>
            <TemplateList data={data[0]}/>

            <NewReportModal />
        </Box>
    );
}
 
export default WorkspacePage;