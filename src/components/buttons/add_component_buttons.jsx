import { Button,Typography } from "@mui/material";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import ShapeLineOutlinedIcon from '@mui/icons-material/ShapeLineOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import FormatShapesOutlinedIcon from '@mui/icons-material/FormatShapesOutlined';

const AddComponentButtons = ({text, icon,type, onClick}) => {
    const chartButtonStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '120px',
        height: '55px',
        borderRadius: '8px',
        textTransform: 'none',
        borderColor: '#ccc',
        color: '#333',
        marginRight:"1%",
        // cursor: selectedComponent ? 'crosshair' : 'default', 
    }

    return ( 
        <>
            <Button
                variant="outlined"
                sx={chartButtonStyles}
                onClick={() => onClick(type)}
            >
                {icon=="text" && (
                    <FormatShapesOutlinedIcon sx={{ fontSize: '18px', marginBottom: '2px' }} />
                )}  
                {icon=="chart" && (
                    <InsertChartOutlinedIcon sx={{ fontSize: '18px', marginBottom: '2px' }} />
                )}  
                {icon=="rect" && (
                    <RectangleOutlinedIcon sx={{ fontSize: '18px', marginBottom: '2px' }} />
                )}  
                {icon=="line" && (
                    <ShapeLineOutlinedIcon sx={{ fontSize: '18px', marginBottom: '2px' }} />
                )}  
                <Typography sx={{ fontSize: '10px' }}>{text}</Typography>
            </Button>
        </>
    );
}
 
export default AddComponentButtons;