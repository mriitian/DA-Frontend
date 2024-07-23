import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Drawer, Typography, useMediaQuery, List, ListItem, ListItemText, ListItemButton, useTheme, Menu, MenuItem, Collapse, Divider } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import { WorkspaceData } from '../assets/dataAsset/dataWorkspace';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginSlice from '../store/loginSlice';

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const workspaces = WorkspaceData.data.slice(0, 2);

    const [anchor, setAnchor] = useState(null);
    const openProfile = Boolean(anchor);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfileClick = (e) => {
        setAnchor(e.currentTarget);
    }

    const handleProfileClose = () => {
        setAnchor(null);
    }

    const handleLogout = () => {
        handleProfileClose();
        console.log("logged out");
        dispatch(loginSlice.actions.logout());
        navigate('/login');
    }

    const iconsStyles = {
        mr: 2,
        borderRadius: '50%',
        border: '1px solid',
        borderColor: 'black'
    };

    const [open, setOpen] = useState(false);
    const [dataOpen, setDataOpen] = useState(false);
    const [privateOpen, setPrivateOpen] = useState(false);
    const [sharedOpen, setSharedOpen] = useState(false);

    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        padding: '2%',
                        width: isMobile ? '80%' : '250px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                    }
                }}
            >
                <Box sx={{ p: 0 }}>
                    <List>
                        <ListItemButton onClick={() => setDataOpen(!dataOpen)}>
                            <Typography sx={{ fontWeight: "600", color: 'primary.secondary', padding: '10px 0', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                Data
                            </Typography>
                            {dataOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={dataOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton onClick={() => setOpen(false)} component={Link} to="/browse-data/open-source">
                                    <ListItemText primary="Open Source" />
                                </ListItemButton>
                                <ListItemButton onClick={() => setOpen(false)} component={Link} to="/browse-data/organizational">
                                    <ListItemText primary="Organizational" />
                                </ListItemButton>
                                <ListItemButton onClick={() => setOpen(false)}>
                                    <ListItemText primary="Private" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItemButton onClick={() => setPrivateOpen(!privateOpen)}>
                            <Typography sx={{ fontWeight: "600", color: 'primary.secondary', padding: '10px 0', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                Private Workspace
                            </Typography>
                            {privateOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={privateOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {workspaces.map((workspace) => (
                                    <ListItemButton key={workspace.id} onClick={() => setOpen(false)} component={Link} to={`workspace?name=${workspace.name}`}>
                                        <ListItemText primary={workspace.name} />
                                    </ListItemButton>
                                ))}
                                <ListItemButton>
                                    <ListItemText primary="More workspaces..." />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItemButton onClick={() => setSharedOpen(!sharedOpen)}>
                            <Typography sx={{ fontWeight: "600", color: 'primary.secondary', padding: '10px 0', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                Shared Workspace
                            </Typography>
                            {sharedOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={sharedOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Workspace 1" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="More workspaces..." />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    color="secondary"
                    sx={{
                        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
                        borderBottom: '1px solid grey'
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
                                <MenuItem
                                    onClick={handleLogout}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
