import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DatabaseIcon from '@mui/icons-material/Storage';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import DataCards from "../cards/dataCards";
import DataFolderCards from "../cards/datafolderCards";
import AccessControlModal from "../modals/accessControlModal";
import DataPage_API from "../../utilities/api/dataPageApis";
import AddDatabase from "../modals/AddDatabase";
import AddCsvExcelModal from "../modals/AddCsvExcelModal"; // Import your new AddCsvExcelModal component

const DatabaseList = ({ type, cardData }) => {
    // State for brand data and modal visibility
    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddDatabaseOpen, setIsAddDatabaseOpen] = useState(false); // State for AddDatabase modal
    const [isAddCsvExcelOpen, setIsAddCsvExcelOpen] = useState(false); // State for AddCsvExcel modal

    const accessToken = useSelector(state => state.login.token);

    useEffect(() => {
        const fetchBrands = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await DataPage_API.getBrands(accessToken);
                setBrandData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, [accessToken]);

    const datasources = cardData.datasource_data;
    const datafolders = cardData.data2;

    const [brand, setBrand] = useState('');
    const [dataChannel, setDataChannel] = useState('');

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleDataChannelChange = (event) => {
        setDataChannel(event.target.value);
    };

    const channel_types = [...new Set(datasources.map(item => item.channel_type))];
    const [filt_datasources, setFilt_datasources] = useState(datasources);
    const [filt_datafolders, setFilt_datafolders] = useState(datafolders);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        if (dataChannel.length === 0 && brand.length === 0) {
            setFilt_datafolders(datafolders);
            setFilt_datasources(datasources);
        } else if (brand.length === 0) {
            const arr1 = datafolders.filter((item) => item.channel_type === dataChannel);
            setFilt_datafolders(arr1);

            const arr2 = datasources.filter((item) => item.channel_type === dataChannel);
            setFilt_datasources(arr2);
        } else if (dataChannel.length === 0) {
            const arr1 = datafolders.filter((item) => item.brand_name === brand);
            setFilt_datafolders(arr1);

            const arr2 = datasources.filter((item) => item.brand_name === brand);
            setFilt_datasources(arr2);
        } else {
            let arr1 = datafolders.filter((item) => item.channel_type === dataChannel);
            let arr2 = datafolders.filter((item) => item.brand_name === brand);

            setFilt_datafolders(arr1.filter(element => arr2.includes(element)));

            arr1 = datasources.filter((item) => item.channel_type === dataChannel);
            arr2 = datasources.filter((item) => item.brand_name === brand);

            setFilt_datasources(arr1.filter(element => arr2.includes(element)));
        }
    }, [brand, dataChannel]);

    const handleDatabaseClick = () => {
        setIsAddDatabaseOpen(true); // Open the AddDatabase modal
        handleClose(); // Close the popover after clicking
    };

    const handleFileClick = () => {
        setIsAddCsvExcelOpen(true); // Open the AddCsvExcel modal
        handleClose(); // Close the popover after clicking
    };

    const handleAddDatabaseClose = () => {
        setIsAddDatabaseOpen(false); // Close the AddDatabase modal
    };

    const handleAddCsvExcelClose = () => {
        setIsAddCsvExcelOpen(false); // Close the AddCsvExcel modal
    };

    if (loading) {
        return <div style={{ textAlign: 'center', margin: '20px' }}>Loading...</div>;
    }

    return (
        <>
            <Grid container alignItems="center" sx={{ margin: "20px 0 10px 0", }}>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "grey",
                            fontWeight: "550",
                            fontFamily: "sans-serif",
                            marginLeft: "2%",
                        }}
                    >
                        {type} Data
                    </Typography>
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: '30%',
                            margin: '0 1%',
                            border: '1px solid grey',
                            borderRadius: '12px', 
                        }}
                    >
                        <InputLabel>Choose a brand</InputLabel>
                        <Select
                            value={brand}
                            onChange={handleBrandChange}
                            label="Choose a brand"
                            IconComponent={KeyboardArrowDownIcon}
                            sx={{
                                '& fieldset': {
                                    border: 'none',
                                },
                            }}
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
                            width: '30%',
                            margin: '0 1%',
                            border: '1px solid grey',
                            borderRadius: '12px', 
                        }}>
                        <InputLabel>Choose a data channel</InputLabel>
                        <Select
                            value={dataChannel}
                            onChange={handleDataChannelChange}
                            label="Choose a data channel"
                            IconComponent={KeyboardArrowDownIcon}
                            sx={{
                                '& fieldset': {
                                    border: 'none',
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {channel_types && channel_types.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {type !== "Open Source" && (
                        <Button
                            sx={{
                                width: '20%',
                                height: '56px',
                                margin: '0 1%',
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
                                        border: "1px solid white",
                                        borderRadius: "5px",
                                        height: "18px",
                                        width: "90%"
                                    }}
                                />
                            }
                            onClick={handleClick}
                        >
                            <Typography variant="body2">
                                New
                            </Typography>
                        </Button>
                    )}
                </Grid>

                {/* Popover for New Button */}
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        mt: 1,
                        color: '#ADADAD',
                        '& .MuiPaper-root': { 
                            border: '1px solid #ADADAD', 
                            borderRadius: '10px',
                            boxShadow: 'none', 
                        },
                    }}
                >
                    <List>
                        <ListItem button onClick={handleDatabaseClick}>
                            <ListItemIcon>
                                <DatabaseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Database" />
                        </ListItem>
                        <ListItem button onClick={handleFileClick}>
                            <ListItemIcon>
                                <FileIcon />
                            </ListItemIcon>
                            <ListItemText primary="File" />
                        </ListItem>
                    </List>
                </Popover>
            </Grid>

            {/* Modal to display AddDatabase component */}
            <Modal
                open={isAddDatabaseOpen}
                onClose={handleAddDatabaseClose}
                aria-labelledby="modal-add-database-title"
                aria-describedby="modal-add-database-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: '12px',
                        boxShadow: 24,
                    }}
                >
                    <AddDatabase handleClose={handleAddDatabaseClose} /> {/* Render the AddDatabase component here */}
                </Box>
            </Modal>

            {/* Modal to display AddCsvExcelModal component */}
            <Modal
                open={isAddCsvExcelOpen}
                onClose={handleAddCsvExcelClose}
                aria-labelledby="modal-add-csv-excel-title"
                aria-describedby="modal-add-csv-excel-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: '12px',
                        boxShadow: 24,
                    }}
                >
                    <AddCsvExcelModal open={isAddCsvExcelOpen} handleClose={handleAddCsvExcelClose} /> {/* Render the AddCsvExcelModal component here */}
                </Box>
            </Modal>

            {channel_types.map((channel) => (
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
                        {filt_datafolders.map((item) => (
                            item.channel_type === channel && (
                                <Grid item md={3} xs={6} key={item.id}>
                                    <DataFolderCards data={item} />
                                </Grid>
                            )
                        ))}
                        {filt_datasources.map((item) => (
                            item.channel_type === channel && (
                                <Grid item md={3} xs={6} key={item.id}>
                                    <DataCards data={item} />
                                </Grid>
                            )
                        ))}
                    </Grid>
                </Box>
            ))}
            <AccessControlModal />
        </>
    );
};

export default DatabaseList;
