import { createSlice} from "@reduxjs/toolkit";

const State = {
    user:null,
    refreshToken:null,
    token:null
}

const initalState = State;

const loginSlice = createSlice({
    name:"login",
    initialState: initalState,

    reducers:{
        setAccountLog: (state,action)=>{
            state.user = action.payload.user;
            state.refreshToken = action.payload.refreshToken;
            state.token = action.payload.token;
        },
    },
});

export default loginSlice ;