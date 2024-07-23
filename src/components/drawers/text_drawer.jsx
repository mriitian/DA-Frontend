import { Divider, Drawer, List, Typography, IconButton, ToggleButtonGroup, ToggleButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import ColorPicker from "./color_picker";

const TextDrawer = ({open,nodeId, setOpen, style,setStyle}) => {
    const [alignment, setAlignment] = useState('left');
    const [formats, setFormats] = useState(() => []);
    const [fontSize, setFontSize] = useState('14px');
    const [selectedColor, setSelectedColor] = useState('#000000');

    useEffect(()=>{

        if(style.hasOwnProperty(nodeId)){
            const node_style = style[nodeId];  

            setAlignment(node_style.textAlign);
            setFormats(node_style.formats);
            setFontSize(node_style.fontSize);
            setSelectedColor(node_style.color);
        }

        else{
            setAlignment('left');
            setFormats(() => []);
            setFontSize('14px');
            setSelectedColor('#000000');
        }
        
    },[nodeId])

    useEffect(() => {
        const obj = { textAlign: alignment, formats, fontSize: fontSize, color: selectedColor };
    
        setStyle(prevStyle => ({
            ...prevStyle,
            [nodeId]: obj
        }));
    }, [alignment, formats, fontSize, selectedColor, nodeId]);


    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const toggleButtonStyles = {
        border:"none",
        
    }

    return (
        <>
            <Drawer
                open={open}
                anchor="right"
                sx={{
                    '& .MuiDrawer-paper': {
                        padding: '2%',
                        width: '20%',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                        height: "80%",
                        marginTop: "20%",
                        position:"fixed"
                    }
                }}
                variant="persistent"
                // onClose={setOpen(false)}
            >

                <Divider />
                <Typography variant="h6" sx={{ color: "green" }}>
                    Text Properties
                </Typography>
                <ColorPicker selectedColor={selectedColor} onChange={setSelectedColor} />
                <FormControl variant="standard" sx={{ m: 1, width: "40%" }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        label="Font Size"
                    >
                        <MenuItem value='14px'>14px</MenuItem>
                        <MenuItem value='16px'>16px</MenuItem>
                        <MenuItem value='18px'>18px</MenuItem>
                        <MenuItem value='20px'>20px</MenuItem>
                    </Select>
                </FormControl>
                <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                    sx={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}
                >
                    <ToggleButton sx={toggleButtonStyles} value="bold" aria-label="bold">
                        <FormatBoldOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton sx={toggleButtonStyles} value="italic" aria-label="italic">
                        <FormatItalicOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton sx={toggleButtonStyles} value="underlined" aria-label="underlined">
                        <FormatUnderlinedOutlinedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    sx={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}
                >
                    <ToggleButton sx={toggleButtonStyles} value="left" aria-label="left aligned">
                        <FormatAlignLeftOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton sx={toggleButtonStyles} value="center" aria-label="center aligned">
                        <FormatAlignCenterOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton sx={toggleButtonStyles} value="right" aria-label="right aligned">
                        <FormatAlignRightOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton sx={toggleButtonStyles} value="justify" aria-label="justify aligned">
                        <FormatAlignJustifyOutlinedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Drawer>

        </>
    );
};

export default TextDrawer;
