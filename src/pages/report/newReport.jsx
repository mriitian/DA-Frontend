import React, { useState, useRef } from "react";
import { Button, Grid, TextField, Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, { addEdge, ReactFlowProvider, useNodesState, useEdgesState, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReportDrawer from "../../components/drawers/report_drawer";
import AddComponentButtons from "../../components/buttons/add_component_buttons";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import RectangleNode from "../../components/nodes/rect_node";
import TextNode from "../../components/nodes/text_node";
import ChartNode from "../../components/nodes/chartNode";
import ReportAPIs from "../../utilities/api/reports/ReportAPIs";

const nodeTypes = {
    rectangle: RectangleNode,
    text: TextNode,
    chart: ChartNode
};

const initialEdges = [];

const NewReportPage = () => {
    const user = useSelector(state => state.login.user);
    const navigate = useNavigate();

    const [reportName, setReportName] = useState("Untitled Report"); // Default name for a new report
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
    const [nodeType, setNodeType] = useState(null);
    const flowWrapper = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [nodeId, setNodeId] = useState(null);
    const [style, setStyle] = useState({});

    const handleSaveClick = async () => {
        try {
            const newReport = {
                report_name: reportName,
                owner: user.username,
                nodes: nodes,
                users_access: [],
                template: [],
                datasources: []
            };

            const response = await ReportAPIs.createReport(newReport); // Create a new report API call
            console.log('Created New Report:', response);
            navigate(`/report/edit/${response.id}`); // Navigate to the newly created report edit page
        } catch (err) {
            console.log('Error saving the report:', err);
        }
    };

    const handleComponentClick = (type) => {
        setDrawerOpen(false);
        setNodeType(type);
        setNodeId(`${type}_${nodes.length + 1}`);

        const flowWrapperRect = flowWrapper.current.getBoundingClientRect();
        const centerX = flowWrapperRect.width / 2;
        const centerY = flowWrapperRect.height / 2;

        if (type !== "chart") {
            const newNode = {
                id: `${type}_${nodes.length + 1}`,
                node_name: `${type}_${nodes.length + 1}`,
                type: type,
                position: { x: centerX, y: centerY },
                data: { label: `${type} ${nodes.length + 1}`, setNodes: setNodes, styles: style, type: type },
            };

            setNodes((nds) => nds.concat(newNode));
        }

        if (type !== 'rectangle') setDrawerOpen(true);
    };

    const handleChartNodeClick = (chart) => {
        const flowWrapperRect = flowWrapper.current.getBoundingClientRect();
        const centerX = flowWrapperRect.width / 2;
        const centerY = flowWrapperRect.height / 2;

        setNodeType('chart');
        setNodeId(`${chart}_${nodes.length + 1}`);

        const newChart = {
            id: `chart_${nodes.length + 1}`,
            type: 'chart',
            node_name: `chart_${nodes.length + 1}`,
            position: { x: centerX, y: centerY },
            data: { label: `Chart ${nodes.length + 1}`, chartData: chart },
        };

        setNodes((nds) => nds.concat(newChart));
    };

    const handleDeleteNode = () => {
        setNodes((nds) => nds.filter(node => !node.selected));
    };

    const addComponent = [
        { "text": "Add Charts", "icon": "chart", "type": "chart" },
        { "text": "Line", "icon": "line", "type": "line" },
        { "text": "Rectangle", "icon": "rect", "type": "rectangle" },
        { "text": "Text Box", "icon": "text", "type": "text" },
    ];

    const mainContentStyles = {
        width: drawerOpen ? "80%" : "100%",
        backgroundColor: "white",
        border: "1px solid #D3D3D3",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        height: `calc(100% - 64px)`,
        position: "relative",
        overflow: "auto",
        borderRadius: "15px",
        marginTop: "2%"
    };

    const buttonStyles = {
        borderRadius: '6px',
        textTransform: 'none',
        backgroundColor: '#00bfa5',
        color: 'white',
        minWidth: '80px',
        minHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        '&:hover': {
            backgroundColor: '#008c75'
        },
    };

    return (
        <ReactFlowProvider>
            <Box>
                <Grid container sx={{ margin: "2% 2% 2% 0" }} spacing={2}>
                    <Grid item md={4} xs={4}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    sx={{
                                        fontSize: '1.3rem',
                                        fontWeight: 'bolder',
                                        marginRight: '8px',
                                        color: "grey"
                                    }}
                                    onChange={(e) => setReportName(e.target.value)}
                                    value={reportName} // Controlled component for report name
                                />
                            </Grid>
                            <Grid item>
                                <DriveFileRenameOutlineOutlinedIcon
                                    sx={{
                                        fontSize: '1.4rem',
                                        cursor: 'pointer',
                                        color: "grey"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={8} xs={8} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {addComponent.map((but) => (
                                <AddComponentButtons key={but.text} text={but.text} icon={but.icon} type={but.type} onClick={handleComponentClick} />
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, marginRight: "3%" }}>
                            <Button
                                sx={buttonStyles}
                                onClick={handleSaveClick}
                                variant="contained"
                                startIcon={
                                    <AddIcon
                                        sx={{
                                            border: "1px solid white",
                                            borderRadius: "5px",
                                            height: "20px",
                                            width: "20px"
                                        }}
                                    />
                                }
                            >
                                Save
                            </Button>

                            <Button
                                sx={buttonStyles}
                                variant="contained"
                                startIcon={
                                    <AddIcon
                                        sx={{
                                            border: "1px solid white",
                                            borderRadius: "5px",
                                            height: "20px",
                                            width: "20px"
                                        }}
                                    />
                                }
                            >
                                Add Template
                            </Button>

                            {drawerOpen && (
                                <Button
                                    sx={buttonStyles}
                                    variant="contained"
                                    startIcon={
                                        <AddIcon
                                            sx={{
                                                border: "1px solid white",
                                                borderRadius: "5px",
                                                height: "20px",
                                                width: "20px"
                                            }}
                                        />
                                    }
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    Exit
                                </Button>
                            )}
                        </Box>
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
                            width: drawerOpen ? "80%" : "100%",
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
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
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

                <ReportDrawer nodeId={nodeId} open={drawerOpen} setOpen={setDrawerOpen} nodeType={nodeType} style={style} setStyle={setStyle} handleChartNodeClick={handleChartNodeClick} datasources={[]} />
            </Box>
        </ReactFlowProvider>
    );
};

export default NewReportPage;
