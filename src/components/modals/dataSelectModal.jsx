import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import DataCards from "../cards/dataCards";
import { useSelector } from "react-redux";
import DataSelectModal_API from "../../utilities/api/dataSelectModalApis";

const DataSelectModal = ({ open, setOpen, data, setData }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const accessToken = useSelector(state => state.login.token);

    const [open_data,setOpenData] = useState([]);
    const [open_loading, setOpenLoading] = useState(true); 
    const [open_error, setOpenError] = useState(null); 

    const [org_data,setOrgData] = useState([]);
    const [org_loading, setOrgLoading] = useState(true); 
    const [org_error, setOrgError] = useState(null); 
    
    const [pri_data,setPriData] = useState([]);
    const [pri_loading, setPriLoading] = useState(true); 
    const [pri_error, setPriError] = useState(null); 

    useEffect(()=>{
        const fetchOpenData = async () => {
            setOpenLoading(true);
            setOpenError(null);

            try {
                const data = await DataSelectModal_API.getOpenData(accessToken);
                setOpenData(data);
            } catch (error) {
                setOpenError(error);
            } finally {
                setOpenLoading(false);
            }
        };

        const fetchOrgData = async () => {
            setOrgLoading(true);
            setOrgError(null);

            try {
                const data = await DataSelectModal_API.getOrgData(accessToken);
                setOrgData(data);
            } catch (error) {
                setOrgError(error);
            } finally {
                setOrgLoading(false);
            }
        };

        const fetchPrivData = async () => {
            setPriLoading(true);
            setPriError(null);

            try {
                const data = await DataSelectModal_API.getPrivateData(accessToken);
                setPriData(data);
            } catch (error) {
                setPriError(error);
            } finally {
                setPriLoading(false);
            }
        };

        fetchOpenData();
        fetchOrgData();
        fetchPrivData();
    },[accessToken])

    const [dataType, setDataType] = useState('open');
    const [selectedCards, setSelectedCards] = useState([]);

    const handleCardClick = (id, datasource_name) => {
        if (selectedCards.some(card => card.id === id)) {
            setSelectedCards(selectedCards.filter(card => card.id !== id));
        } else {
            setSelectedCards([...selectedCards, { id, datasource_name }]);
        }
    }

    const handleCancelClick = () => {
        setSelectedCards([]);
        setOpen(false);
    }

    const handleAddClick = () => {
        setData(selectedCards);
        setOpen(false);
    }

    const getButtonStyle = (type) => ({
        textDecoration: dataType === type ? 'underline' : 'none',
        color: dataType === type ? '#4db6ac' : 'inherit',
        margin: '0 10px',
        padding: '10px 20px',
        // borderRadius: '8px',
        // border: dataType === type ? '2px solid #4db6ac' : '2px solid transparent',
        // backgroundColor: dataType === type ? 'rgba(0, 128, 0, 0.1)' : 'inherit',
        fontWeight: dataType === type ? 'bold' : 'normal'
    });

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center', // Center align vertically
                    justifyContent: 'center', // Center align horizontally
                }}
            >
                <Box
                    sx={{
                        width: '70%', // Set the width to 70%
                        maxHeight: '80%', // Ensure modal doesn't overflow vertically
                        overflowY: 'auto', // Scroll if content exceeds height
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        p: 4,
                        boxShadow: 24,
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide scrollbar in WebKit browsers
                        },
                        scrollbarWidth: 'none', // Hide scrollbar for Firefox
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Add Data
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Button onClick={() => setDataType('open')} style={getButtonStyle('open')}>
                            Open Source
                        </Button>
                        <Button onClick={() => setDataType('org')} style={getButtonStyle('org')}>
                            Organizational
                        </Button>
                        <Button onClick={() => setDataType('pri')} style={getButtonStyle('pri')}>
                            Private
                        </Button>
                    </Box>

                    <Box>
                        {dataType === 'open' && open_error && (
                            <Typography color="error">
                                {open_error?.response?.data?.error || 'Failed to fetch open data'}
                            </Typography>
                        )}
                        {dataType === 'org' && org_error && (
                            <Typography color="error">
                                {org_error?.response?.data?.error || 'Failed to fetch organizational data'}
                            </Typography>
                        )}
                        {dataType === 'pri' && pri_error && (
                            <Typography color="error">
                                {pri_error?.response?.data?.error || 'Failed to fetch private data'}
                            </Typography>
                        )}

                        {dataType === 'open' && !open_loading && open_data && (
                            <Grid container columnGap={2}>
                                {open_data.map((item) => (
                                    <Grid
                                        item
                                        onClick={() => handleCardClick(item.id, item.datasource_name)}
                                        key={item.id}
                                        md={3}
                                        xs={5}
                                        sx={{
                                            cursor: 'pointer',
                                            border: selectedCards.some(card => card.id === item.id) ? '2px solid #4db6ac' : '2px solid transparent',
                                            borderRadius: '8px',
                                            p: 1,
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        <DataCards data={item} disable={true} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        {dataType === 'org' && !org_loading && org_data && (
                            <Grid container  columnGap={2}>
                                {org_data.map((item) => (
                                    <Grid
                                        item
                                        onClick={() => handleCardClick(item.id, item.datasource_name)}
                                        key={item.id}
                                        md={3}
                                        xs={5}
                                        sx={{
                                            cursor: 'pointer',
                                            border: selectedCards.some(card => card.id === item.id) ? '2px solid green' : '2px solid transparent',
                                            borderRadius: '8px',
                                            p: 1,
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        <DataCards data={item} disable={true} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        {dataType === 'pri' && !pri_loading && pri_data && (
                            <Grid container  columnGap={2}>
                                {pri_data.map((item) => (
                                    <Grid
                                        item
                                        onClick={() => handleCardClick(item.id, item.datasource_name)}
                                        key={item.id}
                                        md={3}
                                        xs={5}
                                        sx={{
                                            cursor: 'pointer',
                                            border: selectedCards.some(card => card.id === item.id) ? '2px solid green' : '2px solid transparent',
                                            borderRadius: '8px',
                                            p: 1,
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        <DataCards data={item} disable={true} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button onClick={handleCancelClick} sx={{ mr: 2 }}>
                            Cancel
                        </Button>

                        <Button onClick={handleAddClick} variant="contained" color="primary">
                            Add
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </>
    );
};

export default DataSelectModal;
