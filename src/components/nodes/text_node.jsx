import React, { useState, useEffect } from 'react';
import { NodeResizer } from 'reactflow';
import { Box } from '@mui/material';

const TextNode = ({ data, id, selected }) => {
    const [val, setVal] = useState(data.label);
    const [styles, setStyles] = useState({
        textAlign: "left",
        fontSize: "16px",
        color: "black"
    });

    // console.log(id,data);


    const [bold,setBold] = useState(false);
    const [underlined, setUnderlined] = useState(false);
    const [italic,setItalic] = useState(false);

    const setNodes = data.setNodes;

    useEffect(() => {
        setVal(data.label);
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
        
        // console.log(data.styles);
        // if (data.styles.get(id)) {
        //     setStyles(data.styles.get(id));

        //     const arr = data.styles.get(id).formats;

        //     arr.includes('bold')?setBold(true):setBold(false);
        //     arr.includes('underlined')?setUnderlined(true):setUnderlined(false);
        //     arr.includes('italic')?setItalic(true):setItalic(false);
        // }

        if(data.styles.hasOwnProperty(id)){
            const arr = data.styles[id].formats;

            // console.log(data.styles[id]);

            setStyles(data.styles[id]);

            arr.includes('bold')?setBold(true):setBold(false);
            arr.includes('underlined')?setUnderlined(true):setUnderlined(false);
            arr.includes('italic')?setItalic(true):setItalic(false);
        }

        // console.log(typeof(data.styles));
    }, [data.styles]);

    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <Box
                sx={{
                    // border: "1px solid #222",
                    // borderRadius: "5px",
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
                        fontSize: styles.fontSize, // Only font size changes
                        color: styles.color,
                        padding: '5px',
                        boxSizing: 'border-box',
                        resize: 'none',
                        outline: 'none',
                        fontWeight: bold?'bold':'normal',
                        fontStyle: italic?'italic':'normal',
                        textDecoration: underlined?'underline':'normal'

                    }}
                />
            </Box>
        </>
    );
};

export default TextNode;
