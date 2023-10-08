import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
    id:string,
    name:string,
    price:number,

}

const cartItemsFromLocalStorage = localStorage.getItem("cartItems");
const cartItems = cartItemsFromLocalStorage ? JSON.parse(cartItemsFromLocalStorage) : [] as CartItem[];

const initialState = {
    cartItem :cartItems as CartItem[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const courseToAdd = action.payload;
            console.log(courseToAdd,"ary")
            
            // Check if the course is already in the cart.
            const existingCourse = state.cartItem.find((item) => item.id === courseToAdd._id);

            
        
            if (!existingCourse) {
                // If the course is not in the cart, add it.
                state.cartItem.push({ ...courseToAdd, cartQuantity: 1 });
                toast.success(`Add ${action.payload.courseName} to Cart`,{
                    position:"bottom-right"
                })
            }

            localStorage.setItem("cartItems",JSON.stringify(state.cartItem))
        }
        
        
    }
});




export const {addToCart} =cartSlice.actions
export default cartSlice.reducer;