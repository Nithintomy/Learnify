import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    cartCount: 0,
}

const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        updateCartCount:(state,action)=>{
            state.cartCount =action.payload;
        }
    }
})

export const {updateCartCount} =cartSlice.actions;

export const selectCartCount =(state:any)=>state.cart.cartCount;


export default cartSlice.reducer