import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchChats, 
  sendMessage, 
  createChat,
  fetchMessages 
} from "./chatActions";

const initialState = {
  chats: [],
  currentChat: null,
  messages: [],
  loading: false,
  error: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    clearChat: (state) => {
      state.currentChat = null;
      state.messages = [];
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateLastMessage: (state, action) => {
      const { chatId, message, timestamp } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.lastMessage = message;
        chat.lastMessageTime = timestamp;
      }
    },
    updateChats: (state, action) => {
      state.chats = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
        state.error = null;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.chats = [];
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = [...state.messages, action.payload];
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create chat
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = [...state.chats, action.payload];
        state.currentChat = action.payload;
        state.error = null;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages = [];
      });
  }
});

export const { 
  setCurrentChat, 
  clearChat, 
  updateMessages,
  updateLastMessage,
  updateChats
} = chatSlice.actions;

export default chatSlice.reducer;