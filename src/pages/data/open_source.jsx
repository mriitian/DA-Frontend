import DatabaseList from "../../components/data_page_views/database_list";
import { useSearchParams } from "react-router-dom";
import TableList from "../../components/data_page_views/table_list";
import useFetch from "../../components/hooks/useFetch";
import { useState, useEffect } from "react";
import DatasourceList from "../../components/data_page_views/datasource_list";
// import OpenSourceData_API from "../../utilities/api/openSourceDataApis";
import { useSelector } from "react-redux";
import OpenSourceData_API from "../../utilities/api/openSourceDataApis";

const OpenSourcePage = () => {
    const [searchParams] = useSearchParams();
    const datasource_name = searchParams.get('datasource');
    const datafolder_name = searchParams.get('datafolder');

    const accessToken = useSelector(state => state.login.token);

    const [datasourceData, setDatasourceData] = useState([]);
    const [datasourceLoading, setDatasourceLoading] = useState(true);
    const [datasourceError, setDatasourceError] = useState(null);

    const [datafolderData, setDatafolderData] = useState([]);
    const [datafolderLoading, setDatafolderLoading] = useState(true);
    const [datafolderError, setDatafolderError] = useState(null);

    console.log('OpenSourcePage Opened');

    useEffect(()=>{
        const fetchDataSources = async () => {
            setDatasourceLoading(true);
            setDatasourceError(null);

            try {
                const data = await OpenSourceData_API.getDataSources(accessToken);
                setDatasourceData(data);
            } catch (error) {
                setDatasourceError(error);
            } finally {
                setDatasourceLoading(false);
            }
        };

        const fetchDataFolders = async () => {
            setDatasourceLoading(true);
            setDatasourceError(null);

            try {
                const data = await OpenSourceData_API.getDataFolders(accessToken);
                setDatafolderData(data);
            } catch (error) {
                console.log(error);
                setDatafolderError(error);
            } finally {
                setDatafolderLoading(false);
            }
        };

        fetchDataSources();
        fetchDataFolders();
    },[accessToken])

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

    if (datasourceError && datafolderError) {
        return <div  style={styles.error} >Error {datasourceError.message || datafolderError.message}</div>;
    }

    console.log('Data Sources:', datasourceData);
    console.log('Data Folders:', datafolderData);

    console.log('filteredDatasourceData:', filteredDatasourceData);
    console.log('datafolderData:', datafolderData);

    return (
        <>
            {!datasource_name && !datafolder_name && filteredDatasourceData.length && datafolderData && (
                <DatabaseList type="Open Source" cardData={{ datasource_data: filteredDatasourceData, data2: datafolderData }} />
            )}

            {datafolder_name && (
                <DatasourceList type="Open Source" datafolder_data={filteredDatafolderData} datafolder_name={datafolder_name} />
            )}

            {datasource_name && (
                <TableList type="Open Source" datasource_name={datasource_name} />
            )}
        </>
    );
};



export default OpenSourcePage;
