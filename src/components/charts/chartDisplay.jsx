import { useEffect, useState } from "react";
import ChartComponent from "./chartComponent";
import { Pagination } from "@mui/material";

const ChartDisplay = ({chart}) => {
    const x_values = chart.x_values;
    const y_values = chart.y_values;

    const multiline = chart.multiline;
    const pagination = chart.pagination;

    const items_per_page = 5;

    const [paginated_xValues,setPaginated_x_val] = useState([]);
    const [paginated_yValues,setPaginated_y_val] = useState([]);

    const [paginatedChart,setPaginatedChart] = useState(chart);
    
    const totalPages = Math.ceil(x_values.length/items_per_page);

    const [page,setPage] = useState(1);

    useEffect(()=>{
        const startIdx = (page-1) * items_per_page;
        const endIdx = startIdx + items_per_page;

        setPaginated_x_val(x_values.slice(startIdx,endIdx));

        if(multiline){
            setPaginated_y_val(y_values.map((arr) => arr.slice(startIdx,endIdx)));
        }
        else{
            setPaginated_y_val(y_values.slice(startIdx,endIdx));
        }

        
        
    },[page]);

    useEffect(()=>{
        setPaginatedChart({
            ...chart,
            x_values: paginated_xValues,
            y_values: paginated_yValues,
        })
    },[paginated_xValues]);


    const handlePageChange = (event,value) =>{
        setPage(value);
    }

    return ( 
        <div 
            style={{
                width:'100%', 
                height:"100%",
            }}
        >
            {pagination && paginated_xValues.length>0 && paginatedChart.x_values.length > 0 && (
                
                <div style={{width:"100%", height:"100%"}}>
                    {/* {console.log(paginatedChart)} */}
                    {/* {console.log(paginated_xValues,paginated_yValues)} */}
                    <ChartComponent chartdata ={paginatedChart}/>
                    <Pagination 
                        count={totalPages} 
                        page={page} 
                        onChange={handlePageChange} 
                        shape="rounded"
                        color="primary"
                    />
                </div>
                
            )}
            {!pagination && (
                <div style={{width:"100%", height:"100%"}}>
                    {/* {console.log(x_values,y_values)} */}
                    <ChartComponent chartdata={chart}/>
                </div>
                
            )}
        </div>
    );
}
 
export default ChartDisplay;