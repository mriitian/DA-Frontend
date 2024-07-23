import { Modal, Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccessModalSlice from "../../store/accessModalSlice";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Example JSON object for people with access
const peopleWithAccess = [
    { name: 'Person 1', access: 'View' },
    { name: 'Person 2', access: 'Edit' },
    { name: 'Person 3', access: 'Admin' },
];

const AccessControlModal = () => {
    const open = useSelector(state => state.access_modal.open);
    const database_name = useSelector(state => state.access_modal.database);
    const dispatch = useDispatch();

    const [accessList, setAccessList] = useState(peopleWithAccess);

    const handleClose = () => {
        dispatch(AccessModalSlice.actions.setOpen({
            open: false,
            database_name: null
        }));
    };

    const handleAccessChange = (index, event) => {
        const newAccessList = [...accessList];
        newAccessList[index].access = event.target.value;
        setAccessList(newAccessList);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {database_name ? `Share "${database_name}"` : 'No Database Selected'}
                    </Typography>
                    <TextField
                        label="Add People"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                    />
                    <Typography variant="subtitle1" component="p">
                        People with Access
                    </Typography>
                    {accessList.map((person, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 1,
                                marginLeft:'5%'
                            }}
                        >
                            <Typography>{person.name}</Typography>
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                
                                <Select
                                    value={person.access}
                                    onChange={(event) => handleAccessChange(index, event)}
                                    label="Access"
                                    IconComponent={KeyboardArrowDownIcon}
                                >
                                    <MenuItem value="View">View</MenuItem>
                                    <MenuItem value="Edit">Edit</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    ))}
                    <Typography variant="subtitle1" component="p" sx={{ mt: 2 }}>
                        General Access
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1,
                            marginLeft:'5%'
                            
                        }}
                    >
                        <Typography>Anyone with the link</Typography>
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            
                            <Select
                                value="View"
                                label="Access"
                                IconComponent={KeyboardArrowDownIcon}
                            >
                                <MenuItem value="View">View</MenuItem>
                                <MenuItem value="Edit">Edit</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default AccessControlModal;
