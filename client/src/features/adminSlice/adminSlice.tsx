import { createSlice,PayloadAction } from "@reduxjs/toolkit";



interface AdminState {
    admin :any  //any 
    token: string | null;

}

const initialState :AdminState={
    admin: null,
    token: localStorage.getItem("token") || null,
}

const adminSlice =createSlice({
    name:"admin",
    initialState,
    reducers:{
        login:(state,action: PayloadAction<any | null>)=>{
            state.admin =action.payload
            state.token = action.payload?.token || null;
            localStorage.setItem("adminData", JSON.stringify(action.payload));
        },
       
        logout:(state)=>{
            state.admin ={}
            localStorage.clear(); 
        }
    }
})


export const {login,logout} =adminSlice.actions;
export const selectAdmin =(state:{admin: AdminState})=>state.admin.admin


export default adminSlice.reducer;