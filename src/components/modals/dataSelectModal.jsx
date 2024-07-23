import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import DataCards from "../cards/dataCards";

const DataSelectModal = ({ open, setOpen, data, setData }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const baseURL = import.meta.env.VITE_HOST_HOST_URL;

    const [dataType, setDataType] = useState('open');
    const [selectedCards, setSelectedCards] = useState([]);

    const { data: open_data, loading: open_loading, error: open_error } = useFetch(baseURL + 'data/datasources?security_type=open-source');
    const { data: org_data, loading: org_loading, error: org_error } = useFetch(baseURL + 'data/datasources?security_type=organizational');
    const { data: pri_data, loading: pri_loading, error: pri_error } = useFetch(baseURL + 'data/datasources?security_type=private');

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
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '80%',
                        maxHeight: '80%',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        p: 4,
                        boxShadow: 24,
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
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
                        {dataType === 'open' && open_error && <Typography color="error">Failed to fetch open data</Typography>}
                        {dataType === 'org' && org_error && <Typography color="error">Failed to fetch organizational data</Typography>}
                        {dataType === 'pri' && pri_error && <Typography color="error">Failed to fetch private data</Typography>}

                        {dataType === 'open' && !open_loading && open_data && (
                            <Grid container columnGap={2}>
                                {open_data.map((item) => (
                                    <Grid
                                        item
                                        onClick={() => handleCardClick(item.id, item.datasource_name)}
                                        key={item.id}
                                        md={3}
                                        xs={6}
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
                                        xs={6}
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
                                        xs={6}
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
