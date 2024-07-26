import ChartDrawer from "./chart_drawer";
import TextDrawer from "./text_drawer";

const ReportDrawer = ({open, nodeId, setOpen,style,setStyle, handleChartNodeClick, nodeType,datasources}) => {
    // console.log(nodeType);
    return ( 
        <>
            {nodeType==="text" && <TextDrawer nodeId={nodeId} open={open} setOpen={setOpen} style={style} setStyle={setStyle}/>}
            {nodeType==="chart" && <ChartDrawer open={open} setOpen={setOpen} handleChartNodeClick={handleChartNodeClick} datasources={datasources}/>}
        </>
    );
}
 
export default ReportDrawer;