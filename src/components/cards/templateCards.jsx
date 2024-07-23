import { Card, CardMedia, CardContent, Typography, Box,Menu,MenuItem,IconButton } from "@mui/material";
import image from "../../assets/images/Figure_20.jpeg"; 
import Divider from '@mui/material/Divider';
import { colors } from "@mui/material";
import { useState } from "react";

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const TemplateCards = ({ data }) => {
    const [anchorEl,setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const path = "../../assets/images/Figure_20.jpeg";

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Card 
            sx={{ 
                maxWidth: '100%', 
                borderRadius: "20px", 
                // overflow: 'hidden', 
                border: '1px solid #e0e0e0',
                backgroundColor:"primary.light",
                boxShadow:`0px 3px ${colors.teal[300]}`,
                
            }}
        >
            <Box
                sx={{
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"6%",
                    width:"80%"
                }}
            >
                
            <CardMedia
                component="img"
                image={image}
                alt="Sales Prediction"
                sx={{ 
                    height: "100px", 
                    objectFit: 'cover', 
                    width: "100%",
                    
                    border:"1.5px solid ",
                    borderColor:"primary.main",
                    borderRadius:"10px"
                }}
            
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'left',
                    padding: 0,
                }}
            >
                    
                <Typography
                    sx={{
                        fontSize: '16px',
                        color: 'grey',
                        margin:'5% 0 5% 0'
                    }}
                >
                    {data.name}
                </Typography>

                <Divider />

                <Typography
                    sx={{
                        fontSize: '15px',
                        color: 'grey',
                        marginTop:'10%',
                        textTransform:"lowercase"
                    }}
                >
                    {data.description}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <IconButton
                        sx={{
                            border:'1px solid grey',
                            width:"25px",
                            height:"25px",
                        }}
                        onClick={handleClick}
                    >
                        <MoreHorizOutlinedIcon fontSize='small' />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem >View</MenuItem>
                    <MenuItem >Regenerate</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </CardContent>
            </Box>
        </Card>
    );
}

export default TemplateCards;
