import DatabaseList from "../../components/organizational/database_list";
import { useSearchParams } from "react-router-dom";
import TableList from "../../components/organizational/table_list";
import useFetch from "../../components/hooks/useFetch";
import { useState,useEffect } from "react";

const OrgPage = () => {
    const [searchParams] = useSearchParams();
    const datasource_name = searchParams.get('datasource');

    const baseURL = import.meta.env.VITE_HOST_HOST_URL;

    const {data:data1,loading,error} = useFetch(baseURL+`data/datasources/?security_type=organizational`);

    const [datasource_data,setDatasource_data] = useState([]);

    useEffect(()=>{
        if(data1){
            const arr = data1.filter((temp)=> temp.data_folder === null);
            setDatasource_data(arr);
        }
    },[data1])

    console.log(data1);

    return ( 
        <>
            {!datasource_name && !loading && datasource_data && <DatabaseList cardData={datasource_data}/>}
            {datasource_name && <TableList datasource_name={datasource_name}/>}
        </>
    );
}
 
export default OrgPage;