import DatabaseList from "../../components/organizational/database_list";
import { useSearchParams } from "react-router-dom";
import TableList from "../../components/organizational/table_list";
import useFetch from "../../components/hooks/useFetch";
import { useState, useEffect } from "react";
import DatasourceList from "../../components/organizational/datasource_list";

const OrgPage = () => {
    const [searchParams] = useSearchParams();
    const datasource_name = searchParams.get('datasource');
    const datafolder_name = searchParams.get('datafolder');

    const baseURL = import.meta.env.VITE_HOST_HOST_URL;

    const { data: datasourceData, loading: datasourceLoading, error: datasourceError } = useFetch(baseURL + `data/datasources/?security_type=organizational`);
    const { data: datafolderData, loading: datafolderLoading, error: datafolderError } = useFetch(baseURL + `data/datafolder/?security_type=organizational`);

    const [filteredDatasourceData, setFilteredDatasourceData] = useState([]);
    const [filteredDatafolderData, setFilteredDatafolderData] = useState([]);

    const styles = {
        spinner: {
            border: '4px solid rgba(0, 0, 0, 0.1)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            borderLeftColor: '#09f',
            animation: 'spin 1s ease infinite',
            margin: '50px auto',
        },
        error: {
            color: 'red',
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '18px',
        },
        '@keyframes spin': {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            },
        },
    };
    

    useEffect(() => {
        if (datasourceData) {
            const arr = datasourceData.filter(temp => temp.data_folder === null);
            setFilteredDatasourceData(arr);

            if (datafolder_name) {
                const arr2 = datasourceData.filter(temp => temp.data_folder !== null);
                setFilteredDatafolderData(arr2);
            }
        }
    }, [datasourceData, datafolder_name]);

    if (datasourceLoading || datafolderLoading) {
        return <div style={styles.spinner}></div>;
    }

    if (datasourceError || datafolderError) {
        console.log(datasourceError);
        return <div  style={styles.error} >Error {datasourceError.message || datafolderError.message}</div>;
    }

    return (
        <>
            {!datasource_name && !datafolder_name && filteredDatasourceData.length && datafolderData && (
                <DatabaseList cardData={{ datasource_data: filteredDatasourceData, data2: datafolderData }} />
            )}

            {datafolder_name && (
                <DatasourceList datafolder_data={filteredDatafolderData} datafolder_name={datafolder_name} />
            )}

            {datasource_name && (
                <TableList datasource_name={datasource_name} />
            )}
        </>
    );
};



export default OrgPage;
