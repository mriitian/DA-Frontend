import { Divider, Drawer, List, ListItemButton, Typography } from "@mui/material";
import { template2 } from "../../assets/dataAsset/data_template";

const ChartDrawer = ({open,setOpen,handleChartNodeClick}) => {
    const charts = template2.charts;
    return ( 
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="right"
                sx={{
                    '& .MuiDrawer-paper': {
                        padding: '2%',
                        width: '20%',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                        height: "80%",
                        marginTop: "20%",
                        position:"fixed"
                    }
                }}
                variant="persistent"
            >
                <Divider />
                <Typography variant="h6" sx={{color:"green"}}>
                    Add Chart
                </Typography>
                
                <List>
                    {charts.map((chart) =>(
                        <ListItemButton key={chart.chart_id} onClick={()=>handleChartNodeClick(chart)}>{chart.title}</ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
 
export default ChartDrawer;