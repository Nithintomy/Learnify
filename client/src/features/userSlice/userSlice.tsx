import { createSlice,PayloadAction } from "@reduxjs/toolkit";



interface UserState {
    user :any  //any 

}

const initialState :UserState={
    user:''
}

const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action: PayloadAction<any | null>)=>{
            console.log(action.payload,"payload here")
            state.user =action.payload
        },
       
        logout:(state)=>{
            state.user =''
        }
    }
})


export const {login,logout} =userSlice.actions;
export const selectUser =(state:{user: UserState})=>state.user.user


export default userSlice.reducer;