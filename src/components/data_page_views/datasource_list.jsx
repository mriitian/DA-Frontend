import { useLocation, useParams } from "react-router-dom";
import { Breadcrumbs,Link,Typography,Box,Grid } from "@mui/material";
import { BrowseData } from "../../assets/dataAsset/dataCardData";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DataCards from "../cards/dataCards";
import AccessControlModal from "../modals/accessControlModal";
import useFetch from "../hooks/useFetch";

const DatasourceList = ({type, datafolder_name,datafolder_data}) => {

    const data = datafolder_data;
    const currentURL = useLocation().pathname;
    // const prevPath = currentURL.replace(/\/\d+$/, '/');

    // console.log(prevPath); 

    console.log('DatasourceList Opened');

    return ( 
        <>
            <AccessControlModal />
            <Breadcrumbs 
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{
                    margin:"1% 2% 1% 2%"
                }}
            >
                <Link sx={{fontWeight:500}} underline="hover" color="inherit" href={currentURL}>
                    {type}
                </Link>
               
                <Typography sx={{fontWeight:600}} color="grey">{datafolder_name}</Typography>
            </Breadcrumbs>

            <Box
                sx={{
                    marginTop:"3%"
                }}
            >
                <Grid container columnSpacing={1} rowSpacing={2}>
                    {data.map((item)=>(
                            
                        <Grid item xs={3} key={item.id}>
                            <DataCards data={item}/>
                        </Grid>
                            
                    ))}
                </Grid>
            </Box>
        </>
    );
}
 
export default DatasourceList;