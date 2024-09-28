import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DatabaseList from "../../components/data_page_views/database_list";
import DatasourceList from "../../components/data_page_views/datasource_list";
import TableList from "../../components/data_page_views/table_list";
import OrganizationalData_API from "../../utilities/api/organizationalDataApis";

const OrgPage = () => {
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

    useEffect(() => {
        const fetchDataSources = async () => {
            setDatasourceLoading(true);
            setDatasourceError(null);

            try {
                const data = await OrganizationalData_API.getDataSources(accessToken);
                setDatasourceData(data);
            } catch (error) {
                setDatasourceError(error);
            } finally {
                setDatasourceLoading(false);
            }
        };

        const fetchDataFolders = async () => {
            setDatafolderLoading(true);
            setDatafolderError(null);

            try {
                const data = await OrganizationalData_API.getDataFolders(accessToken);
                setDatafolderData(data);
            } catch (error) {
                setDatafolderError(error);
            } finally {
                setDatafolderLoading(false);
            }
        };

        fetchDataSources();
        fetchDataFolders();
    }, [accessToken]);

    const [filteredDatasourceData, setFilteredDatasourceData] = useState([]);
    const [filteredDatafolderData, setFilteredDatafolderData] = useState([]);

    useEffect(() => {
        if (datasourceData) {
            const arr = datasourceData.filter(temp => temp.data_folder === null);
            setFilteredDatasourceData(arr);

            if (datafolder_name) {
                const datafolder_name1 = datafolderData.filter(temp => temp.name === datafolder_name);
                const arr2 = datasourceData.filter(temp => temp.data_folder === datafolder_name1[0]?.id);
                setFilteredDatafolderData(arr2);
            }
        }
    }, [datasourceData, datafolder_name]);

    if (datasourceLoading || datafolderLoading) {
        return <div style={styles.spinner}></div>;
    }

    // if (datasourceError || datafolderError) {
    //     return <div style={styles.error}>Error: {datasourceError?.message || datafolderError?.message}</div>;
    // }

    return (
        <>
            {!datasource_name && !datafolder_name && (
                <DatabaseList
                    type="Organizational"
                    cardData={{
                        datasource_data: filteredDatasourceData,
                        data2: datafolderData
                    }}
                />
            )}
            {datafolder_name && (
                <DatasourceList type="Organizational" datafolder_data={filteredDatafolderData} datafolder_name={datafolder_name} />
            )}
            {datasource_name && (
                <TableList type="Organizational" datasource_name={datasource_name} />
            )}
        </>
    );
};

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

export default OrgPage;
