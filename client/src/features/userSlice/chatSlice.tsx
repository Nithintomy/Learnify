import { createSlice } from "@reduxjs/toolkit";

// Define the type for your state
interface ChatState {
  chatId: string ; // Adjust the type as needed
}

const initialState: ChatState = {
    chatId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
});

export const { setChatId } = chatSlice.actions;


// Specify the type for the state parameter in the selector
export const selectChatId = (state: { chat: ChatState }) => state.chat.chatId;
export default chatSlice.reducer;
