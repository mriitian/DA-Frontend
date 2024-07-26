import { Accordion, AccordionDetails, AccordionSummary, Divider, Drawer, List, ListItemButton, MenuItem, Select, Typography, IconButton, Box, TextField, Grid } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { template2 } from "../../assets/dataAsset/data_template";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import DataCards from "../cards/dataCards";

const ChartDrawer = ({ open, setOpen, handleChartNodeClick }) => {
    const charts = template2.charts;
    const baseURL = import.meta.env.VITE_HOST_HOST_URL;
    const [selectedChart, setSelectedChart] = useState('');

    const chart_data = useSelector(state => state.report_datasource.datasources);
    console.log(chart_data);

    let datasources = [];
    if (chart_data) {
        datasources = chart_data.map((item) => {
            const { data, loading, error } = useFetch(baseURL + `data/datasources/${item}`);
            return data;
        });
        console.log(datasources);
    }

    const handleChange = (event) => {
        const chart = charts.find(c => c.chart_id === event.target.value);
        setSelectedChart(event.target.value);
        handleChartNodeClick(chart);
    };

    const [selectedDataBase, setSelectedDataBase] = useState(null);
    const [columns,setColumns] = useState([]);
    
    const[x_axis, setX_axis] = useState('');
    const[y_axis, setY_axis] = useState('');

    const handleCardClick = (database) =>{
        setSelectedDataBase(database);
    }

    useEffect(()=>{
        if(selectedDataBase)
            setColumns(selectedDataBase.attached_column_aliases);
    },[selectedDataBase])

    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="right"
                sx={{
                    '& .MuiDrawer-paper': {
                        padding: '2%',
                        width: '300px',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                        height: "95%",
                        marginTop:"10%",
                    }
                }}
                variant="persistent"
            >
                <Box sx={{ padding: '1%', height: "100%", overflow: 'auto' }}>
                    <Typography variant="h6" sx={{ color: "black", marginBottom: '0px' }}>
                        Add Chart
                    </Typography>

                    <Select
                        value={selectedChart}
                        onChange={handleChange}
                        displayEmpty
                        sx={{ width: '100%', marginBottom: '0px' }}
                    >
                        <MenuItem value="" disabled>Select Chart Type</MenuItem>
                        {charts.map((chart) => (
                            <MenuItem key={chart.chart_id} value={chart.chart_id}>
                                {chart.title}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography variant="subtitle1" sx={{ marginBottom: '0px' }}>
                        Datasources
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Typography>

                    {datasources && (
                        <Grid container spacing={1} sx={{ marginBottom: '0px',marginLeft:"1%" }}>
                            {datasources.map((item, index) => (
                                <Grid
                                    item
                                    onClick={() => handleCardClick(item)}
                                    key={item.id}
                                    md={5}
                                    xs={5}
                                    sx={{
                                        cursor: 'pointer',
                                        border: selectedDataBase==item ? '2px solid #4db6ac' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >   
                                    <DataCards data={item} disable={true} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    <Typography variant="subtitle1" sx={{ marginBottom: '0px' }}>
                        X-axis
                    </Typography>
                    <Select
                        displayEmpty
                        sx={{ width: '100%', marginBottom: '0px' }}
                        value={x_axis}
                        onChange={(e) => setX_axis(e.target.value)}
                    >
                        <MenuItem value="" disabled>Select a field</MenuItem>
                        {columns.length && columns.map((column) => (
                            <MenuItem key={column} value={column}>
                                {column}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography variant="subtitle1" sx={{ marginBottom: '0px' }}>
                        Y-axis
                    </Typography>
                    <Select
                        displayEmpty
                        sx={{ width: '100%', marginBottom: '2%' }}
                        value={y_axis}
                        onChange={(e) => setY_axis(e.target.value)}
                    >
                        <MenuItem value="" disabled>Select a field</MenuItem>
                        {columns.length && columns.map((column) => (
                            <MenuItem key={column} value={column}>
                                {column}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Drawer>
        </>
    );
}

export default ChartDrawer;
