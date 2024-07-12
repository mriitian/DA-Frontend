import TextDrawer from "./text_drawer";

const ReportDrawer = ({open, setOpen, type, style,setStyle}) => {
    return ( 
        <>
            {type==="text" && <TextDrawer open={open} setOpen={setOpen} style={style} setStyle={setStyle}/>}
        </>
    );
}
 
export default ReportDrawer;