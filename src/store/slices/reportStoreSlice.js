import { createSlice} from "@reduxjs/toolkit";

const State = {
    reports:[]
}

const initalState = State;

const ReportStoreSlice = createSlice({
    name:"report_drawer_slice",
    initialState: initalState,

    reducers:{
        setReports: (state,action)=>{
            state.reports = [...state.reports,action.payload]
        },
    },
});

export default ReportStoreSlice;