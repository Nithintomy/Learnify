import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any; // any 
  token: string | null;
}

const initialState: UserState = {
  user: '',
  token: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any | null>) => {
      console.log(action.payload, "payload here")
      state.user = action.payload;
      state.token = action.payload?.token || null;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    signup: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      // Update the user's profile image 
      if (state.user) {
        state.user.photo = action.payload;
        localStorage.setItem("userData", JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = ''
      state.token = null;    
      localStorage.removeItem("userData");
    }
  }
})

export const { login, logout, signup, updateProfileImage } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user

export default userSlice.reducer;
