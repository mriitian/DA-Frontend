import { useLocation, useParams } from "react-router-dom";
import { Breadcrumbs,Link,Typography,Box,Grid } from "@mui/material";
import { BrowseData } from "../../assets/dataAsset/dataCardData";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DataCards from "../cards/dataCards";
import AccessControlModal from "../modals/accessControlModal";

const TableList = ({type, datasource_name}) => {
    const data = BrowseData.data.find(val => val.datasource_name == datasource_name);
    // console.log(data);

    const currentURL = useLocation().pathname;
    // const prevPath = currentURL.replace(/\/\d+$/, '/');

    // console.log(prevPath); 

    return ( 
        <>
            
            <AccessControlModal />
            {/* <Breadcrumbs 
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{
                    margin:"1% 2% 1% 2%"
                }}
            >
                <Link sx={{fontWeight:500}} underline="hover" color="inherit" href={currentURL}>
                    Organizational Data
                </Link>
               
                <Typography sx={{fontWeight:600}} color="grey">{data.datasource_name}</Typography>
            </Breadcrumbs> */}

            <Box
                sx={{
                    marginTop:"3%"
                }}
            >
                <Grid container columnSpacing={1} rowSpacing={2}>
                    {data.tables.map((item)=>(
                        <>
                            {(
                                <Grid xs={3}>
                                    <DataCards data={item}/>
                                </Grid>
                            )}
                        </>
                    ))}
                </Grid>
            </Box>
        </>
    );
}
 
export default TableList;