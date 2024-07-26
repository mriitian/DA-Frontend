import { createSlice} from "@reduxjs/toolkit";

const State = {
    open: false
}

const initalState = State;

const newReportModalSlice = createSlice({
    name:"new_report_modal",
    initialState: initalState,

    reducers:{
        setOpen: (state,action)=>{
            state.open = action.payload.open;
        },
    },
});

export default newReportModalSlice ;