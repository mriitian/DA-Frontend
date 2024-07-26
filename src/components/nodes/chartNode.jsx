import ChartDisplay from "../charts/chartDisplay";
import { NodeResizer } from "reactflow";
import { Box } from "@mui/material";

const ChartNode = ({ data, selected }) => {
    const chart = data.chartData;
    // console.log(chart);

    return (
        <>

            <NodeResizer isVisible={selected} color="#ff0071" minWidth={data.width} minHeight={data.height} />
            {/* <Box sx={{
                border: "1px solid #222",
                borderRadius: "5px",
                background: "#eee",
                width: "150px", // Set a fixed width
                height: "150px", // Set a fixed height
                minWidth: "150px",
                minHeight: "150px",
                overflow: "hidden", // Ensures content fits within the box
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}> */}
                <div style={{width:"100%", height:"100%"}}>
                    <ChartDisplay chart={chart} />
                </div>
                
            {/* </Box> */}
        </>
    );
}

export default ChartNode;
