import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tutor {
  _id: string;
  name: string;
  tutorName: string;
  email: string;
  phone: string;
  photo: string;
  token: string;
}

interface TutorState {
  tutor: Tutor | null;
}

const initialState: TutorState = {
  tutor: null,
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Tutor | null>) => {
      state.tutor = action.payload;
      localStorage.setItem("tutorData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.tutor = null; // Set tutor to null on logout
      localStorage.removeItem("tutorData");
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      // Update the user's profile image
      if (state.tutor) {
        state.tutor.photo = action.payload;
        localStorage.setItem("tutorData", JSON.stringify(state.tutor));
      }
    },
    updateTutorDetails: (state, action: PayloadAction<Partial<Tutor>>) => {
      // Update the user's details
      if (state.tutor) {
        state.tutor.name = action.payload.name || state.tutor.name;
        state.tutor.email = action.payload.email || state.tutor.email;
        state.tutor.phone = action.payload.phone || state.tutor.phone;
        localStorage.setItem("tutorData", JSON.stringify(state.tutor));
      }
    },
  },
});

export const { login, logout, updateProfileImage, updateTutorDetails } = tutorSlice.actions;
export const selectTutor = (state: { tutor: TutorState }) => state.tutor.tutor;
export default tutorSlice.reducer;
