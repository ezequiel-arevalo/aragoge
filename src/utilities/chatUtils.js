import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "@/services/firestore";
import { selectUser } from "@/redux/user/userSelectors";
import { updateChats } from "@/redux/chat/chatSlice";

export const useChat = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const subscribeToChats = useCallback(() => {
    if (!currentUser?.id) return () => {};

    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("participants", "array-contains", currentUser.id)
    );

    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        lastMessageTime:
          doc.data().lastMessageTime?.toDate?.().toISOString() || null,
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || null,
      }));

      dispatch(updateChats(chats));
    });
  }, [currentUser?.id, dispatch]);

  useEffect(() => {
    const unsubscribe = subscribeToChats();
    return () => unsubscribe();
  }, [subscribeToChats]);
};

export const findExistingChat = async (userId, adminId) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));

    const querySnapshot = await getDocs(q);
    const existingChat = querySnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.participants.includes(adminId);
    });

    return existingChat
      ? { id: existingChat.id, ...existingChat.data() }
      : null;
  } catch (error) {
    console.error("Error finding existing chat:", error);
    throw error;
  }
};

export const formatContactMessage = (userData, message) => {
  return `
    ${message}
    `.trim();
};
