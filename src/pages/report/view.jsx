import { Button, Grid, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, MiniMap } from 'reactflow';
import RectangleNode from "../../components/nodes/rect_node";
import TextNode from "../../components/nodes/text_node";
import ChartNode from "../../components/nodes/chartNode";
import 'reactflow/dist/style.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ReportAPIs from "../../utilities/api/reports/ReportAPIs";

const nodeTypes = {
    rectangle: RectangleNode,
    text: TextNode,
    chart: ChartNode
};

const initialEdges = [];

const ViewPage = () => {

    const buttonStyles = {
        margin: 'auto 1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        textTransform: 'none',
    };

    const user = useSelector(state => state.login.user);
    const token = useSelector(state => state.login.token);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const flowWrapper = useRef(null);

    const { report_name } = useParams();

    useEffect(() => {
        setNodes([]);
    }, []);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch report details using the new ReportAPIs method
                const data1 = await ReportAPIs.getDetail(report_name);
                console.log("Fetched Data: ", data1);
                setData(data1);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();

    }, [report_name])

    useEffect(() => {
        if (data) {
            // Update the nodes with parsed data and position
            setNodes(data.nodes.map((node) => {
                let parsedPosition = { x: 0, y: 0 };
                let parsedData = {};
    
                // Check if position is a string and then parse it, otherwise use it directly
                if (typeof node.position === 'string') {
                    try {
                        // Convert to valid JSON string format
                        let formattedPosition = node.position.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":');
                        parsedPosition = JSON.parse(formattedPosition);
                    } catch (e) {
                        console.error('Error parsing node position:', node.position);
                        return null; // Skip this node
                    }
                } else if (typeof node.position === 'object' && node.position !== null) {
                    parsedPosition = node.position;
                }
    
                // Check if data is a string and then parse it, otherwise use it directly
                if (typeof node.data === 'string') {
                    try {
                        // Transform to valid JSON format
                        let formattedData = node.data
                            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":') // Add double quotes around property names
                            .replace(/'([^']+)'/g, '"$1"') // Convert single quotes to double quotes for string values
                            .replace(/ƒ/g, 'null'); // Replace function placeholders with null or appropriate value
    
                        parsedData = JSON.parse(formattedData);
                    } catch (e) {
                        console.error('Error parsing node data:', node.data);
                        return null; // Skip this node
                    }
                } else if (typeof node.data === 'object' && node.data !== null) {
                    parsedData = node.data;
                }
    
                return {
                    ...node,
                    id: node.id || node.node_name,
                    position: parsedPosition,
                    height: node.height,
                    width: node.width,
                    draggable: false,
                    selectable: false,
                    data: {
                        ...parsedData,
                        width: node.width,
                        height: node.height
                    }
                };
            }).filter(node => node !== null)); // Filter out any null nodes
        }
    }, [data]);    

    useEffect(() => {
        console.log("Nodes State:", nodes);
    }, [nodes]);

    const mainContentStyles = {
        width: "100%",
        backgroundColor: "white",
        border: "1px solid #D3D3D3",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        height: `calc(100% - 64px)`,
        position: "relative",
        overflow: "auto",
        borderRadius: "15px",
        marginTop: "2%"
    };

    return (
        <ReactFlowProvider>
            {!loading && !error && data && (
                <Box>
                    <Grid container
                        sx={{
                            margin: "2% 2% 2% 0"
                        }}
                    >
                        <Grid item md={4} xs={7}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography>{data.report_name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item md={8} xs={5}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >

                            <Button
                                sx={buttonStyles}
                                variant="contained"
                                color="primary"
                                startIcon={
                                    <AddIcon
                                        sx={{
                                            border: "1px solid white",
                                            borderRadius: "5px",
                                            height: "18px",
                                            width: "90%"
                                        }}
                                    />
                                }
                            >
                                <Typography variant="body2">
                                    Save
                                </Typography>
                            </Button>
                            <Button
                                sx={buttonStyles}
                                variant="contained"
                                color="primary"
                                startIcon={
                                    <AddIcon
                                        sx={{
                                            border: "1px solid white",
                                            borderRadius: "5px",
                                            height: "20px",
                                            width: "90%"
                                        }}
                                    />
                                }
                            >
                                <Typography variant="body2">
                                    Share
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            margin: "2% 0% 0 0%",
                            padding: "2%",
                            backgroundColor: "#E0E0E0",
                            border: "1px solid #D3D3D3",
                            height: "100vh",
                            overflowY: "auto",
                        }}
                    >
                        <Box
                            ref={flowWrapper}
                            sx={{
                                ...mainContentStyles,
                                width: "100%",
                                backgroundColor: "white",
                                border: "1px solid #D3D3D3",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                height: "100%",
                                position: "relative",
                                overflow: "auto",
                                borderRadius: "15px"
                            }}
                        >
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onEdgesChange={onEdgesChange}
                                nodeTypes={nodeTypes}
                                fitView
                                zoomOnScroll={false}
                                zoomOnPinch={true}
                                zoomOnDoubleClick={false}
                                panOnScroll={false}
                                panOnDrag={true}
                            >
                                <MiniMap nodeStrokeWidth={6} zoomable pannable />
                            </ReactFlow>
                        </Box>
                    </Box>
                </Box>
            )}
        </ReactFlowProvider>
    );
}

export default ViewPage;
