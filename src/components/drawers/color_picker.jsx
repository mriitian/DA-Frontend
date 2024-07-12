import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Divider, Typography } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';

const colors = ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

const ColorPicker = ({ selectedColor, onChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorSelect = (color) => {
        onChange(color);
        handleClose();
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                style={{ color: selectedColor }}
            >
                <FormatColorTextOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Typography variant="subtitle1" style={{ padding: '8px 16px' }}>Select Color</Typography>
                <Divider />
                {colors.map((color) => (
                    <MenuItem key={color} onClick={() => handleColorSelect(color)}>
                        <div style={{
                            backgroundColor: color,
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '1px solid #ccc',
                            marginRight: 8
                        }}></div>
                        {color}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ColorPicker;
