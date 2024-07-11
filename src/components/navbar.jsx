import * as React from 'react';
import {AppBar, Box,Toolbar, IconButton, Drawer, Typography, useMediaQuery, List, ListItem, ListItemText, ListItemButton,useTheme, Menu, MenuItem} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { WorkspaceData } from '../assets/dataAsset/dataWorkspace';
import { useState } from 'react';

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const workspaces = WorkspaceData.data.slice(0,2);

    const [anchor,setAnchor] = useState(null);
    const openProfile = Boolean(anchor);

    const handleProfileClick = (e) =>{
        setAnchor(e.currentTarget);
    }

    const handleProfileClose = () =>{
        setAnchor(null);
    }

    const iconsStyles = {
        mr: 2,
        borderRadius: '50%', 
        border: '1px solid', 
        borderColor: 'black' 
    };

    const [open, setOpen] = React.useState(false);

    return (
    <>
        <Drawer 
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                '& .MuiDrawer-paper': {
                padding: '2%',
                width: isMobile ? '80%' : '250px', 
                backgroundColor: '#f3f3f3', 
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                }
            }}
        >
            <Box sx={{ p: 0 }}>
                <Typography sx={{fontWeight:"600"}} variant="h6" gutterBottom>
                    Data
                </Typography>
                <List>
                    <ListItemButton onClick={() => setOpen(false)} component={Link} to="/browse-data/open-source">
                        <ListItemText primary="Open Source" />
                    </ListItemButton>
                    <ListItemButton onClick={() => setOpen(false)} component={Link} to="/browse-data/organizational">
                        <ListItemText primary="Organizational" />
                    </ListItemButton>
                    <ListItem>
                        <ListItemText primary="Private" />
                    </ListItem>
                </List>
                <Typography sx={{fontWeight:"600"}} variant="h6" gutterBottom>
                    Private Workspaces
                    <IconButton edge="end" size="small">
                        <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                </Typography>
                <List>
                    {workspaces.map((workspace) => (
                        <ListItemButton onClick={() => setOpen(false)} component={Link} to={`workspace?name=${workspace.name}`}>
                            <ListItemText primary={workspace.name} />
                        </ListItemButton>
                    ))}

                    <ListItem>
                        <ListItemText primary="More workspaces..." />
                    </ListItem>

                </List>
                <Typography sx={{fontWeight:"600"}} variant="h6" gutterBottom>
                    Shared Workspaces
                    <IconButton edge="end" size="small">
                        <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Workspace 1" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="More workspaces..." />
                    </ListItem>
                </List>
            </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1 }}>

            <AppBar 
                position="static" 
                color="secondary"
                sx={{
                    boxShadow:'0px 0px 0px rgba(0,0,0,0)',
                    borderBottom:'1px solid grey'
                }}
            >
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={iconsStyles}    
                        onClick={() => setOpen(true)}
                    >
                        <MenuRoundedIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />  
                    <Box>
                        <IconButton
                            size="medium"
                            edge="end"
                            color="inherit"
                            aria-label="notifications"
                            sx={iconsStyles}
                        >
                            <NotificationsNoneOutlinedIcon />
                        </IconButton>

                        <IconButton
                            size="medium"
                            edge="end"
                            color="inherit"
                            aria-label="account"
                            sx={iconsStyles}
                            onClick={handleProfileClick}
                        >
                            <AccountCircleOutlinedIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchor} 
                            open={openProfile}
                            onClose={handleProfileClose}
                        >
                            <MenuItem 
                                onClick={handleProfileClose}
                                component={Link} to={`/login`}
                            >
                                Login
                            </MenuItem>  
                            <MenuItem 
                                onClick={handleProfileClose}
                                component={Link} to={`/signup`}
                            >
                                Signup
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    </>
    );
}
