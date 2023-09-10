import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface Tutor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
  }
  interface TutorState {
    tutor: Tutor | null;
  }
  const initialState: TutorState = {
    tutor: null,
  }
  

const tutorSlice = createSlice({
    name:"tutor",
    initialState,
    reducers:{
        login:(state,action:PayloadAction<Tutor | null>)=>{
            state.tutor =action.payload

        },
        signup:(state,action:PayloadAction<Tutor | null>)=>{
            state.tutor =action.payload

        },
        logout:(state)=>{
            state.tutor =null

        }
    }

})

export const {login,signup,logout} =tutorSlice.actions
export const selectTutor =(state:{tutor:TutorState})=>state.tutor.tutor
export default tutorSlice.reducer;
