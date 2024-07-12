import { Button, Grid, Typography, Box, Menu, MenuItem, Drawer, Divider, List, ListItemButton, TextField, AppBar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, { addEdge, ReactFlowProvider, useNodesState, useEdgesState, useKeyPress } from 'reactflow';
import RectangleNode from "../../components/nodes/rect_node";
import { useEffect, useState, useRef } from "react";
import 'reactflow/dist/style.css';
import TextNode from "../../components/nodes/text_node";
import DataCards from "../../components/cards/dataCards";
import { template2 } from "../../assets/dataAsset/data_template";
import ChartNode from "../../components/nodes/chartNode";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AddComponentButtons from "../../components/buttons/add_component_buttons";
import ReportDrawer from "../../components/drawers/text_drawer";

const nodeTypes = {
    rectangle: RectangleNode,
    text: TextNode,
    chart: ChartNode
};

const charts = template2.charts;

const initialEdges = [];

const EditPage = () => {
    const buttonStyles = {
        margin: 'auto 1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        textTransform: 'none',
    };

   
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

    const flowWrapper = useRef(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const [style, setStyle] = useState(null);

    useEffect(()=>{
        console.log(style);
    },[style])

    const handleSaveClick = () =>{
        console.log(nodes);
    }

    const handleComponentClick = (type) => {
        console.log(type);
        if(type !== "chart"){
            const newNode = {
                id: `${type}_${nodes.length + 1}`,
                type: type,
                position: {
                    x: 250,
                    y: 250 
                },
                data: { label: `${type} ${nodes.length + 1}`, setNodes:setNodes, styles:style, type:type },
            };
    
            setNodes((nds) => nds.concat(newNode));
            setDrawerOpen(true);
        }
        else{
            setDrawerOpen(true);
        }

    }
    const handleChartNodeClick = (chart) => {
        const newChart = {
            id: `chart_${nodes.length + 1}`,
            type: 'chart',
            position: {
                x: 250,
                y: 250 
            },
            data: { label: `Chart ${nodes.length + 1}`, chartData: chart},
        };

        setNodes((nds) => nds.concat(newChart));
        handleClose();
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
        // Update styles of existing nodes
        setNodes((nds) =>
            nds.map((node) =>
                node.type === 'text' ? { ...node, data: { ...node.data, styles: style } } : node
            )
        );
    }, [style]);

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

    useEffect(() => {
        const selectedNode = nodes.find(node => node.selected);
        if (selectedNode) {
            setDrawerOpen(true);
        }
    }, [nodes]);

    
    return (
        <ReactFlowProvider>
            <Box>
                <Grid container
                    sx={{
                        margin:"2% 2% 2% 0"
                    }}
                >
                    <Grid item md={4} xs={7}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    defaultValue="Untitled Report"
                                    // InputProps={{ disableUnderline: true }}
                                    sx={{
                                        fontSize: '1.3rem',
                                        fontWeight: 'bolder',
                                        marginRight: '8px',
                                        color:"grey"
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <DriveFileRenameOutlineOutlinedIcon
                                    sx={{
                                        fontSize: '1.4rem',
                                        cursor: 'pointer',
                                        color:"grey"
                                    }}
                                />
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
                        {addComponent.map((but) => (
                            <AddComponentButtons key={but.text} text={but.text} icon={but.icon} type={but.type} onClick={handleComponentClick}/>
                        ))}
                        
                        <Button
                            sx={buttonStyles}
                            onClick={handleSaveClick}
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
                                Add Template
                            </Typography>
                        </Button>

                        {drawerOpen && (<Button
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

                            onClick={()=>setDrawerOpen(false)}
                        >
                            <Typography variant="body2">
                                Exit
                            </Typography>
                        </Button>)}
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        margin: "2% 0% 0 0%",
                        padding: "2%",
                        backgroundColor: "#E0E0E0",
                        border: "1px solid #D3D3D3",
                        height:"1000px",
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
                            fitView
                            zoomOnScroll={false}
                            zoomOnPinch={false}
                            zoomOnDoubleClick={false}
                            panOnScroll={false}
                            panOnDrag={false}
                            onlyPanOnDrag={true}
                            defaultCursor="default"
                        />
                    </Box>
                </Box>

                {/* <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    anchor="right"
                    sx={{
                        '& .MuiDrawer-paper': {
                            padding: '2%',
                            width: '30%',
                            backgroundColor: '#f3f3f3', 
                            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                        }
                    }}
                >
                    <Divider />
                    <Typography variant="h6" sx={{color:"green"}}>
                        Add Chart
                    </Typography>
                    
                    <List>
                        {charts.map((chart) =>(
                            <ListItemButton onClick={()=>handleChartNodeClick(chart)}>{chart.title}</ListItemButton>
                        ))}
                    </List>
                </Drawer> */}

                <ReportDrawer open={drawerOpen} setOpen={setDrawerOpen} type={"text"} style={style} setStyle={setStyle} />

            </Box>
        </ReactFlowProvider>
    );
}

export default EditPage;
