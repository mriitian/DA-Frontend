import { createSlice} from "@reduxjs/toolkit";

const State = {
    open: false,
    database:null
}

const initalState = State;

const AccessModalSlice = createSlice({
    name:"access_modal",
    initialState: initalState,

    reducers:{
        setOpen: (state,action)=>{
            state.open = action.payload.open;
            state.database = action.payload.database_name;
        },
    },
});

export default AccessModalSlice;