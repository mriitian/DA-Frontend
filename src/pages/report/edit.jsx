import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, TextField, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, { addEdge, ReactFlowProvider, useNodesState, useEdgesState, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const EditPage = () => {
    const user = useSelector(state => state.login.user);
    const token = useSelector(state => state.login.token);
    const { report_name } = useParams(); // Access report_name from URL

    const [report, setReport] = useState(null);
    const [reportName, setReportName] = useState(report_name); // Initialize with report_name from URL
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
    const [nodeType, setNodeType] = useState(null);
    const flowWrapper = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [nodeId, setNodeId] = useState(null);
    const [style, setStyle] = useState({});
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data1 = await ReportAPIs.getDetail(report_name); // Fetch report details using report_name
                setData(data1);
                setReportName(data1.report_name); // Update report name from fetched data
                setNodes(data1.nodes);
                console.log(data1);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [report_name]);

    const handleSaveClick = async () => {
        console.log(nodes);
        console.log(data.datasource);

        setReport({
            report_name: reportName,
            owner: user.username,
            nodes: nodes,
            users_access: []
        });

        try {
            // Assume that updateReport function can use report_name instead of an id
            const response = await ReportAPIs.updateReport(report_name, {
                report_name: reportName,
                owner: user.username,
                nodes: nodes,
                users_access: [],
                template: [],
                datasources: []
            });
            console.log('Updated Report:', response);
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

    useEffect(() => {
        setNodes([]);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete') {
                handleDeleteNode();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [nodes]);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) =>
                node.type === 'text' ? { ...node, data: { ...node.data, styles: style } } : node
            )
        );
    }, [style]);

    useEffect(() => {
        const selectedNode = nodes.find(node => node.selected);
        if (selectedNode) {
            setDrawerOpen(false);
            setNodeType(selectedNode.type);
            setNodeId(selectedNode.id);
            if (selectedNode.type !== 'rectangle') setDrawerOpen(true);
        }
    }, [nodes]);

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
            {data && (
                <Box>
                    <Grid container sx={{ margin: "2% 2% 2% 0" }} spacing={2}>
                        <Grid item md={4} xs={4}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        defaultValue="Untitled Report"
                                        sx={{
                                            fontSize: '1.3rem',
                                            fontWeight: 'bolder',
                                            marginRight: '8px',
                                            color: "grey"
                                        }}
                                        onChange={(e) => setReportName(e.target.value)}
                                        value={reportName} // Use reportName state
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

                    <ReportDrawer nodeId={nodeId} open={drawerOpen} setOpen={setDrawerOpen} nodeType={nodeType} style={style} setStyle={setStyle} handleChartNodeClick={handleChartNodeClick} datasources={data.datasource} />
                </Box>
            )}
        </ReactFlowProvider>
    );
};

export default EditPage;
