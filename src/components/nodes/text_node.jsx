import React, { useState, useEffect } from 'react';
import { NodeResizer } from 'reactflow';
import { Box } from '@mui/material';

const TextNode = ({ data, id, selected }) => {
    const [val, setVal] = useState(data.label || ""); // Default to empty string if label is undefined
    const [styles, setStyles] = useState({
        textAlign: "left",
        fontSize: "16px",
        color: "black"
    });

    const [bold, setBold] = useState(false);
    const [underlined, setUnderlined] = useState(false);
    const [italic, setItalic] = useState(false);

    const setNodes = data.setNodes; // Ensure data.setNodes is a valid function

    useEffect(() => {
        if (data.label) {
            setVal(data.label); // Update value when data.label changes
        }
    }, [data.label]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setVal(newValue);
        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, label: newValue } } : node
            )
        );
    };

    useEffect(() => {
        // Check if data.styles is defined and has the property for this node
        if (data.styles && data.styles[id]) {
            const arr = data.styles[id].formats || []; // Default to empty array if formats is undefined

            setStyles(data.styles[id]); // Apply styles
            setBold(arr.includes('bold'));
            setUnderlined(arr.includes('underlined'));
            setItalic(arr.includes('italic'));
        }
    }, [data.styles, id]); // Include id as a dependency

    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "stretch",
                }}
            >
                <textarea
                    value={val}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: 'transparent',
                        textAlign: styles.textAlign,
                        fontSize: styles.fontSize,
                        color: styles.color,
                        padding: '5px',
                        boxSizing: 'border-box',
                        resize: 'none',
                        outline: 'none',
                        fontWeight: bold ? 'bold' : 'normal',
                        fontStyle: italic ? 'italic' : 'normal',
                        textDecoration: underlined ? 'underline' : 'normal'
                    }}
                />
            </Box>
        </>
    );
};

export default TextNode;
