import { Button, Grid, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, MiniMap } from 'reactflow';
import RectangleNode from "../../components/nodes/rect_node";
import TextNode from "../../components/nodes/text_node";
import ChartNode from "../../components/nodes/chartNode";
import 'reactflow/dist/style.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../components/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import ReportView_API from "../../utilities/api/reportViewApis";

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

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchChartData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data1 = await ReportView_API.getReport(token,report_name);
                setData(data1);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();

    },[token])


    useEffect(() => {
        if (data) {
            setNodes(data.nodes.map((node) => ({
                ...node,
                id: node.id || node.node_name,
                position: node.position || { x: 0, y: 0 },
                height:node.height,
                width:node.width,
                draggable: false,
                selectable: false,
                data:{
                    ...node.data,
                    width: node.width,
                    height: node.height
                }
    
            })));
        }
    }, [data]);

    useEffect(()=>{
        console.log(nodes);
    },[nodes])

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
                                // onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                nodeTypes={nodeTypes}
                                fitView
                                zoomOnScroll={false}
                                zoomOnPinch={true}
                                zoomOnDoubleClick={false}
                                panOnScroll={false}
                                panOnDrag={true}
                                // defaultNodeOptions={{ draggable: false, selectable: false }}
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
