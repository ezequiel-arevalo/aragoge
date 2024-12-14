import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatChatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  }
  
  return date.toLocaleDateString();
};

export const sortChatsByLatestMessage = (chats) => {
  return [...chats].sort((a, b) => {
    const timeA = a.lastMessageTime ? new Date(a.lastMessageTime) : new Date(0);
    const timeB = b.lastMessageTime ? new Date(b.lastMessageTime) : new Date(0);
    return timeB - timeA;
  });
};

export const getOtherParticipant = (chat, currentUserId) => {
  return chat.participants.find(id => id !== currentUserId);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};