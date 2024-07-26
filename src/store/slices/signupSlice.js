import { createSlice} from "@reduxjs/toolkit";

const State = {
    user:null,
    refreshToken:null,
    token:null
}

const initalState = State;

const signupSlice = createSlice({
    name:"signup",
    initialState: initalState,

    reducers:{
        setAccount: (state,action)=>{
            state.user = action.payload.user;
            state.refreshToken = action.payload.refreshToken;
            state.token = action.payload.token;
        },
    },
});

export default signupSlice ;