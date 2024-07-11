import DatabaseList from "../../components/open_source/database_list";
import { useSearchParams } from "react-router-dom";
import TableList from "../../components/open_source/table_list";
import useFetch from "../../components/hooks/useFetch";

const OpenSourcePage = () => {

    const baseURL = `https://staging.hypadmin.marketgpt.ai/api/`;

    const [searchParams] = useSearchParams();
    const datasource_name = searchParams.get('datasource');
    const {data,loading,error} = useFetch(baseURL+'data/datasources');

    console.log(data);
    
    return ( 
        <>
            {!datasource_name && <DatabaseList/>}
            {datasource_name && <TableList datasource_name={datasource_name}/>}
        </>
    );
}
 
export default OpenSourcePage;