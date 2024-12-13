import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/services/firestore";

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (userId, { rejectWithValue }) => {
    try {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participants", "array-contains", userId)
      );
      
      const querySnapshot = await getDocs(q);
      const chats = [];
      const defaultUserIds = [1, 2]; // IDs de los usuarios con los que debe tener un chat por defecto
      const missingChats = [];

      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
      });

      // Verificar si faltan los chats por defecto
      for (const defaultUserId of defaultUserIds) {
        const hasChat = chats.some(chat => chat.participants.includes(defaultUserId));
        if (!hasChat) {
          missingChats.push(defaultUserId);
        }
      }

      // Crear los chats faltantes
      for (const missingUserId of missingChats) {
        const chatDoc = await addDoc(chatsRef, {
          participants: [userId, missingUserId],
          createdAt: serverTimestamp(),
          lastMessage: null,
          lastMessageTime: null
        });

        chats.push({
          id: chatDoc.id,
          participants: [userId, missingUserId],
          createdAt: new Date().toISOString(),
          lastMessage: null,
          lastMessageTime: null
        });
      }
      
      return chats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async ({ userId, otherUserId }, { rejectWithValue }) => {
    try {
      const chatsRef = collection(db, "chats");
      const chatDoc = await addDoc(chatsRef, {
        participants: [userId, otherUserId],
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: null
      });
      
      return {
        id: chatDoc.id,
        participants: [userId, otherUserId],
        createdAt: new Date().toISOString(),
        lastMessage: null,
        lastMessageTime: null
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, senderId, text }, { rejectWithValue }) => {
    try {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const messageDoc = await addDoc(messagesRef, {
        senderId,
        text,
        timestamp: serverTimestamp()
      });
      
      return {
        id: messageDoc.id,
        senderId,
        text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      
      const querySnapshot = await getDocs(q);
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      return messages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
