import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firestore';
import { selectUser } from '@/redux/user/userSelectors';
import { updateChats } from '@/redux/chat/chatSlice';

export const useChat = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    const subscribeToChats = useCallback(() => {
        if (!currentUser?.id) return () => { };

        const chatsRef = collection(db, "chats");
        const q = query(chatsRef, where("participants", "array-contains", currentUser.id));

        return onSnapshot(q, (snapshot) => {
            const chats = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                lastMessageTime: doc.data().lastMessageTime?.toDate?.().toISOString() || null,
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