import React, { useState } from 'react';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { Card, Box, CardContent, Typography, IconButton, Menu,MenuItem,Button } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useDispatch } from 'react-redux';
import AccessModalSlice from '../../store/slices/accessModalSlice';
import { BorderColor } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

const cardStyle = {
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    border: '1px solid grey',
    transition: 'transform 0.2s',
    position: 'relative',
    // '&:hover': {
    //     transform: 'scale(1.05)',
    //     cursor: 'pointer'
    // },
    '@media (max-width: 600px)': {
        width: '150px',
        height: '120px',
    },

};

const DataFolderCards = ({ data, disable=false }) => {

    // console.log(data);
    const [anchorEl,setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentURL = useLocation().pathname;

    const type = data.type || null;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCardClick = () =>{
        if(!disable)
            navigate(`${currentURL}?datafolder=${data.name}`)
    }

    const handleAcessClick = () => {

        dispatch(AccessModalSlice.actions.setOpen({
            open:true,
            database_name:data.datasource_name
        }));

        setAnchorEl(null);
    }
    
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "2%",
            }}
        >
            <Card sx={cardStyle}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        marginTop:"1%"
                    }}
                >
                    <IconButton 
                        onClick={handleCardClick} 
                        sx={{
                            '&:hover':{
                                borderRadius: '50%',
                                background:'transparent'
                            }
                        }}
                    > 
                        <FolderOutlinedIcon
                            sx={{
                                fontSize: '48px',
                                // color: 'primary.main',
                                marginBottom: 1,
                            }}
                        />
                    </IconButton>
                    
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: 'grey',
                            wordBreak: 'break-word',
                            padding: '8px',         
                            fontFamily:"sans-serif"  
                        }}
                        variant='body'
                    >
                            {data.name}
                    </Typography>
                    
                    {!disable && (
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                border:'1px solid grey',
                                width:"25px",
                                height:"25px"
                            }}
                            onClick={handleClick}
                        >
                            <MoreHorizOutlinedIcon fontSize='small' />
                        </IconButton>
                    )}
                   
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleCardClick}>Explore</MenuItem>
                        {type!=="Open Source" && <MenuItem onClick={handleAcessClick}>Access Control</MenuItem>}
                        <MenuItem>Rename</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DataFolderCards;
