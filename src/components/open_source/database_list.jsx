import DataCards from "../../components/cards/dataCards";
import { BrowseData } from "../../assets/dataAsset/dataCardData";
import { Grid, Typography } from "@mui/material";
import AccessControlModal from "../modals/accessControlModal";

const DatabaseList= () => {
    const cardData = BrowseData.data;
    return ( 
        <>
            <Typography 
                variant="h6" 
                sx={{
                    color: "grey",
                    fontWeight: "550",
                    fontFamily: "sans-serif",
                    margin: "15px 2%",
                }}
            >
                Open Source Data
            </Typography>
            <Grid container columnSpacing={0} rowSpacing={1}>
                {cardData.map((item)=>(
                    <>
                        {item.type === "Open Source" && (
                            <Grid md={3} xs={6}>
                                <DataCards data={item}/>
                            </Grid>
                        )}
                    </>
                ))}
            </Grid>

            <AccessControlModal/>
        </>
    );
}
 
export default DatabaseList;