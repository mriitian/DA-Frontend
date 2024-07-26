import { createSlice} from "@reduxjs/toolkit";

const State = {
    datasources:[]
}

const initalState = State;

const ReportDatasourceSlice = createSlice({
    name:"report_datasource",
    initialState: initalState,

    reducers:{
        setDatasources: (state,action)=>{
            state.datasources = action.payload.datasources;
        },
    },
});

export default ReportDatasourceSlice ;