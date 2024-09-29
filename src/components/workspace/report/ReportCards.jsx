import { Card, CardContent, Typography, Box, Menu, MenuItem, IconButton, Dialog, DialogActions, DialogTitle, Button, DialogContent, DialogContentText } from "@mui/material";
import Divider from '@mui/material/Divider';
import { colors } from "@mui/material";
import { useState } from "react";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ReportAPIs from "../../../utilities/api/reports/ReportAPIs";

const ReportCards = ({ data, onReportDeleted }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate(); // Initialize the navigate hook

    // Dialog state
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Function to open the dialog for deleting a report
    const handleDeleteClick = () => {
        setSelectedReportId(data.id);
        setOpenDialog(true);
    };

    // Function to confirm and delete the report
    const handleConfirmDelete = async () => {
        try {
            await ReportAPIs.deleteReport(selectedReportId);
            setOpenDialog(false);
            setAnchorEl(null);
            if (onReportDeleted) {
                onReportDeleted(selectedReportId); // Notify parent component after deletion
            }
        } catch (error) {
            console.error(`Error deleting report with ID ${selectedReportId}:`, error);
        }
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
        setSelectedReportId(null);
    };

    // Navigate to view page
    const handleViewClick = () => {
        navigate(`/report/${data.id}/view`);
        handleClose();
    };

    // Navigate to edit page
    const handleEditClick = () => {
        navigate(`/report/${data.id}/edit`);
        handleClose();
    };

    return (
        <>
            <Card 
                sx={{ 
                    maxWidth: '100%', 
                    borderRadius: "20px", 
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
                            {data.report_name}
                        </Typography>

                        <Divider />

                        <Typography
                            sx={{
                                fontSize: '14px',
                                color: 'grey',
                                marginTop:'10%',
                            }}
                        >
                            Created: {new Date(data.time_created).toLocaleString()}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: '14px',
                                color: 'grey',
                                marginTop:'5%',
                            }}
                        >
                            Owner: {data.owner}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '10px'
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
                            <MenuItem onClick={handleViewClick}>View</MenuItem>
                            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                        </Menu>
                    </CardContent>
                </Box>
            </Card>

            {/* Dialog for delete confirmation */}
            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="delete-confirmation-dialog"
                aria-describedby="delete-confirmation-description"
                sx={{
                    "& .MuiPaper-root": {
                        padding: 2,
                        borderRadius: '20px', // Setting the border radius of the dialog
                    }
                }}
            >
                <DialogTitle id="delete-confirmation-dialog">Delete Report</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-confirmation-description">
                        Are you sure you want to delete this report? This action cannot be undone, and you will lose all data associated with this report.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} sx={{ color: 'grey' }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }} 
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ReportCards;
