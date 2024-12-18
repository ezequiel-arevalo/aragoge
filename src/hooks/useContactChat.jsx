import { useDispatch } from "react-redux";
import { createChat, sendMessage } from "@/redux/chat/chatActions";
import { findExistingChat, formatContactMessage } from "@/utilities/chatUtils";

export const useContactChat = () => {
  const dispatch = useDispatch();
  const ADMIN_ID = 1;

  const handleContactMessage = async (userData, message) => {
    try {
      let chatToUse = await findExistingChat(userData?.id, ADMIN_ID);

      if (!chatToUse) {
        const newChatResult = await dispatch(
          createChat({
            userId: userData?.id,
            otherUserId: ADMIN_ID,
          })
        ).unwrap();
        chatToUse = newChatResult;
      }

      const messageText = formatContactMessage(userData, message);
      await dispatch(
        sendMessage({
          chatId: chatToUse.id,
          senderId: userData?.id,
          text: messageText,
        })
      ).unwrap();

      return { success: true };
    } catch (error) {
      console.error("Error handling contact message:", error);
      return { success: false, error };
    }
  };

  return {
    handleContactMessage,
  };
};
