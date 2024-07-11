import DatabaseList from "../../components/organizational/database_list";
import { useSearchParams } from "react-router-dom";
import TableList from "../../components/organizational/table_list";

const OrgPage = () => {
    const [searchParams] = useSearchParams();
    const datasource_name = searchParams.get('datasource');
    return ( 
        <>
            {!datasource_name && <DatabaseList/>}
            {datasource_name && <TableList datasource_name={datasource_name}/>}
        </>
    );
}
 
export default OrgPage;