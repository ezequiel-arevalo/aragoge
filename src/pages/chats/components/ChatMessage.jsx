import { memo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const ChatMessage = memo(({ message, isCurrentUser }) => {
    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div
                className={`
          max-w-[70%] p-3 rounded-lg shadow-sm
          ${isCurrentUser
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-white'
                    }
          
        `}
            >
                <p className="break-words">{message.text}</p>
                <span className="text-xs text-white hover:text-white opacity-75 block mt-1">
                    {formatDistanceToNow(new Date(message.timestamp), {
                        addSuffix: true,
                        locale: es
                    })}
                </span>
            </div>
        </div>
    );
});

ChatMessage.displayName = 'ChatMessage';