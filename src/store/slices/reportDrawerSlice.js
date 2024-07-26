import { createSlice} from "@reduxjs/toolkit";

const State = {
    open: false,
    type:null
}

const initalState = State;

const ReportDrawerSlice = createSlice({
    name:"report_drawer_slice",
    initialState: initalState,

    reducers:{
        setOpen: (state,action)=>{
            state.open = action.payload.open;
            state.type = action.payload.type;
        },
    },
});

export default ReportDrawerSlice;