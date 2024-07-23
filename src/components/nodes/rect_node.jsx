// src/TextNode.js
import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { NodeResizer } from 'reactflow';
import { Box } from '@mui/material';

const RectangleNode = ({ data,selected }) => {
    const [val,setVal] = useState("");
    const controlStyle = {
        background: 'transparent',
        border: 'none',
    };

    return (
        <>
            <NodeResizer  color="#ff0071" isVisible={selected}/>
            <Box sx={{
                border:"1px solid #222",
                borderRadius:"2px",
                background:"#eee",
                width:"100%",
                height:"100%",
                minWidth:"20px",
                minHeight:"20px",
            }}>
               
            </Box>
        </>
    );
};

export default RectangleNode;
