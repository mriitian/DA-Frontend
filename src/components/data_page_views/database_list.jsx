import DataCards from "../cards/dataCards";
import { BrowseData } from "../../assets/dataAsset/dataCardData";
import { Box, Grid, Typography,Select,InputLabel,FormControl,Menu,MenuItem,Button,IconButton } from "@mui/material";
import AccessControlModal from "../modals/accessControlModal";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DataFolderCards from "../cards/datafolderCards";
import useFetch from "../hooks/useFetch";
import DataPage_API from "../../utilities/api/dataPageApis";
import { useSelector } from "react-redux";

const DatabaseList = ({type, cardData}) => {

    console.log('DatabaseList Opened',cardData);

    const [brandData,setBrandData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const accessToken = useSelector(state => state.login.token);

    useEffect(()=>{
        const fetchBrands = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await DataPage_API.getBrands(accessToken);
                console.log(data);
                setBrandData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    },[accessToken])


    const datasources = cardData.datasource_data;
    const datafolders = cardData.data2;

    const [brand,setBrand] = useState('');
    const [dataChannel, setDataChannel] = useState('');

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleDataChannelChange = (event) => {
        setDataChannel(event.target.value);
    };

    const channel_types = [...new Set(datasources.map(item => item.channel_type))];

    const [filt_datasources, setFilt_datasources]= useState(datasources);
    const [filt_datafolders, setFilt_datafolders]= useState(datafolders);

    useEffect(()=>{

        if(dataChannel.length == 0 && brand.length == 0){
            setFilt_datafolders(datafolders);
            setFilt_datasources(datasources);
        }

        else if(brand.length == 0){
            const arr1 = datafolders.filter((item)=>item.channel_type == dataChannel);
            setFilt_datafolders(arr1);

            const arr2 = datasources.filter((item)=>item.channel_type == dataChannel);
            setFilt_datasources(arr2);
        }

        else if(dataChannel.length == 0){
            const arr1 = datafolders.filter((item)=>item.brand_name == brand);
            setFilt_datafolders(arr1);

            const arr2 = datasources.filter((item)=>item.brand_name == brand);
            setFilt_datasources(arr2);
        }

        else{
            let arr1 = datafolders.filter((item)=>item.channel_type == dataChannel);
            let arr2 = datafolders.filter((item)=>item.brand_name == brand);

            setFilt_datafolders(arr1.filter(element => arr2.includes(element)));

            arr1 = datasources.filter((item)=>item.channel_type == dataChannel);
            arr2 = datasources.filter((item)=>item.brand_name == brand);

            setFilt_datasources(arr1.filter(element => arr2.includes(element)));
        }
        
    },[brand,dataChannel])



    return ( 
        <>
            <Grid container sx={{margin:"20px 0 10px 0"}}>
                <Grid item xs={9}>
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
                            {brandData && brandData.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}

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
                            {channel_types && channel_types.map((item) => (
                                 <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>

                {/* <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

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
                </Grid> */}
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
               {type}
            </Typography>

            {channel_types.map((channel) =>(
                <Box key={channel}>
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
                        {filt_datafolders.map((item)=>(
                            
                            item.channel_type == channel && (
                                <Grid item md={3} xs={6} key={item.id}>
                                    <DataFolderCards data={item}/>
                                </Grid>
                            )
                        ))}
                        {filt_datasources.map((item)=>(
                            
                            item.channel_type == channel && (
                                <Grid item md={3} xs={6} key={item.id}>
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