import DataCards from "../../components/cards/dataCards";
import { BrowseData } from "../../assets/dataAsset/dataCardData";
import { Box, Grid, Typography,Select,InputLabel,FormControl,Menu,MenuItem,Button,IconButton } from "@mui/material";
import AccessControlModal from "../modals/accessControlModal";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DatabaseList = ({cardData}) => {

    const [brand, setBrand] = useState('');
    const [dataChannel, setDataChannel] = useState('');

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleDataChannelChange = (event) => {
        setDataChannel(event.target.value);
    };

    const channel_types = [...new Set(cardData.map(item => item.channel_type))];

    return ( 
        <>
            <Grid container sx={{margin:"20px 0 10px 0"}}>
                <Grid xs={9}>
                    <FormControl 
                        variant="outlined" 
                        sx={{ 
                            width:'40%',
                            margin:'auto 2% auto 2%',
                            height:""
                        }}
                    >
                        <InputLabel>Choose a brand</InputLabel>
                        <Select
                            value={brand}
                            onChange={handleBrandChange}
                            label="Choose a brand"
                            IconComponent={KeyboardArrowDownIcon}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Brand 1">Brand 1</MenuItem>
                            <MenuItem value="Brand 2">Brand 2</MenuItem>
                            <MenuItem value="Brand 3">Brand 3</MenuItem>
                        </Select>
                    </FormControl>
                
                    <FormControl 
                        variant="outlined" 
                        sx={{ 
                            width:'40%',
                            margin:'0 2% 0 2%'
                        }}>
                        <InputLabel>Choose a data channel</InputLabel>
                        <Select
                            value={dataChannel}
                            onChange={handleDataChannelChange}
                            label="Choose a data channel"
                            IconComponent={KeyboardArrowDownIcon}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Channel 1">Channel 1</MenuItem>
                            <MenuItem value="Channel 2">Channel 2</MenuItem>
                            <MenuItem value="Channel 3">Channel 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button
                        sx={{
                            width: '34%',
                            height: '70%',
                            margin: 'auto 0',
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '6px',
                            textTransform: 'none',
                        }}
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

                                // fontSize="small" 
                            />
                        }
                    >
                        <Typography variant="body2">
                            New
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

            <Typography 
                variant="h6" 
                sx={{
                    color: "grey",
                    fontWeight: "550",
                    fontFamily: "sans-serif",
                    margin: "15px 2%",
                }}
            >
               Organizational Data
            </Typography>

            {channel_types.map((channel) =>(
                <Box>
                    <Typography 
                        sx={{
                            color: "grey",
                            fontFamily: "sans-serif",
                            margin: "15px 2%",
                        }}
                    >
                        {channel.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Typography>
                    <Grid container columnSpacing={0} rowSpacing={1}>
                        {cardData.map((item)=>(
                            
                            item.channel_type == channel && (
                                <Grid md={3} xs={6} key={item.id}>
                                    <DataCards data={item}/>
                                </Grid>
                            )
                        ))}
                    </Grid>
                </Box>
            ))}
            <AccessControlModal/>
        </>
    );
}
 
export default DatabaseList;