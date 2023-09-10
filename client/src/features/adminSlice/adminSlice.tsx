import { createSlice,PayloadAction } from "@reduxjs/toolkit";



interface AdminState {
    admin :any  //any 

}

const initialState :AdminState={
    admin:''
}

const adminSlice =createSlice({
    name:"admin",
    initialState,
    reducers:{
        login:(state,action: PayloadAction<any | null>)=>{
            console.log(action.payload,"payload here")
            state.admin =action.payload
        },
       
        logout:(state)=>{
            state.admin =''
        }
    }
})


export const {login,logout} =adminSlice.actions;
export const selectUser =(state:{admin: AdminState})=>state.admin.admin


export default adminSlice.reducer;