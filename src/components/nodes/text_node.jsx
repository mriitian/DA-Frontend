// src/TextNode.js
import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { NodeResizer } from 'reactflow';
import { Box } from '@mui/material';

const TextNode = ({ data,selected }) => {
    const [val,setVal] = useState("");
    const controlStyle = {
        background: 'transparent',
        border: 'none',
    };
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <Box sx={{
                border:"1px solid #222",
                borderRadius:"5px",
                background:"#eee",
                width:"100%",
                height:"100%"
            }}>
                <input
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: 'transparent',
                        textAlign: 'center',
                        fontSize: '14px',
                    }}
                />
            </Box>
        </>
    );
};

export default TextNode;
