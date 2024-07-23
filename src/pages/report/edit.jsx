import { Button, Grid, Typography, Box, Menu, MenuItem, Drawer, Divider, List, ListItemButton, TextField, AppBar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, { addEdge, ReactFlowProvider, useNodesState, useEdgesState, useKeyPress, MiniMap } from 'reactflow';
import RectangleNode from "../../components/nodes/rect_node";
import { useEffect, useState, useRef } from "react";
import 'reactflow/dist/style.css';
import TextNode from "../../components/nodes/text_node";
import { template2 } from "../../assets/dataAsset/data_template";
import ChartNode from "../../components/nodes/chartNode";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AddComponentButtons from "../../components/buttons/add_component_buttons";
import ReportDrawer from "../../components/drawers/report_drawer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "../../store/loginSlice";

const nodeTypes = {
    rectangle: RectangleNode,
    text: TextNode,
    chart: ChartNode
};

const charts = template2.charts;

const initialEdges = [];

const EditPage = () => {

    const user = useSelector(state => state.login.user);
    const token = useSelector(state => state.login.token);

    const [report, setReport] = useState(null);

    const [report_name, setReportName] = useState(null);
   
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
    
    const [nodeType, setNodeType] = useState(null);

    const flowWrapper = useRef(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [nodeId, setNodeId] = useState(null);

    const [style, setStyle] = useState({});

    const baseURL = import.meta.env.VITE_HOST_HOST_URL;

    const handleSaveClick = async () =>{
        console.log(nodes);

        setReport({
            report_name: report_name,
            owner: user.username,
            nodes: nodes,
            users_access:[]
        });

        try{
            const response = await axios.post(baseURL + 'reports/report/',{
                report_name: report_name,
                owner: user.username,
                nodes: nodes,
                users_access:[]
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);

        }

        catch(err){
            console.log(err);
        }
    }

    const handleComponentClick = (type) => {
       
        setDrawerOpen(false);

        // setTimeout(() => {
            setNodeType(type);
            setNodeId(`${type}_${nodes.length + 1}`);

            const flowWrapperRect = flowWrapper.current.getBoundingClientRect();
            const centerX = flowWrapperRect.width / 2;
            const centerY = flowWrapperRect.height / 2;

            if(type !== "chart"){
                const newNode = {
                    id: `${type}_${nodes.length + 1}`,
                    node_name: `${type}_${nodes.length + 1}`,
                    type: type,
                    position: {
                        x: centerX,
                        y: centerY 
                    },
                    data: { label: `${type} ${nodes.length + 1}`, setNodes: setNodes, styles: style, type: type },
                };

                setNodes((nds) => nds.concat(newNode));
            }

            if(type !== 'rectangle')
                setDrawerOpen(true);
        // }, 30); 

    }
    const handleChartNodeClick = (chart) => {

        // console.log(chart);
        const flowWrapperRect = flowWrapper.current.getBoundingClientRect();
        const centerX = flowWrapperRect.width / 2;
        const centerY = flowWrapperRect.height / 2;

        setNodeType('chart');
        setNodeId(`${chart}_${nodes.length + 1}`);

        const newChart = {
            id: `chart_${nodes.length + 1}`,
            type: 'chart',
            node_name:`chart_${nodes.length + 1}`,
            position: {
                x: centerX,
                y: centerY 
            },
            data: { label: `Chart ${nodes.length + 1}`, chartData: chart},
        };

        setNodes((nds) => nds.concat(newChart));
        // handleClose();
    }
    
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
            setNodeId(selectedNode.id)

            if (selectedNode.type !== 'rectangle')
                setDrawerOpen(true);
            // },30);
        }
    }, [nodes]);
    

    const addComponent= [
        {"text":"Add Charts","icon":"chart","type":"chart"},
        {"text":"Line","icon":"line","type":"line"},
        {"text":"Rectangle","icon":"rect","type":"rectangle"},
        {"text":"Text Box","icon":"text","type":"text"},
    ]

    const mainContentStyles = {
        width: drawerOpen ? "80%" : "100%",
        backgroundColor: "white",
        border: "1px solid #D3D3D3",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        height: `calc(100% - 64px)`, // Adjust this value based on the height of the second bar
        position: "relative",
        overflow: "auto",
        borderRadius: "15px",
        marginTop: "2%"  // Add this line to create space below the top bar
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
            // marginRight:"3%"
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
                                    defaultValue="Untitled Report"
                                    sx={{
                                        fontSize: '1.3rem',
                                        fontWeight: 'bolder',
                                        marginRight: '8px',
                                        color: "grey"
                                    }}
                                    onChange={(e) => setReportName(e.target.value)}
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

                        <Box sx={{ display: 'flex', gap: 1, marginRight:"3%"}}>
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
                        height:"100vh",
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
                            // fitView
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
                
                <ReportDrawer nodeId={nodeId} open={drawerOpen} setOpen={setDrawerOpen} nodeType={nodeType} style={style} setStyle={setStyle} handleChartNodeClick={handleChartNodeClick}/>
            </Box>
        </ReactFlowProvider>
    );
}

export default EditPage;
