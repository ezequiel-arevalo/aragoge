import { useState } from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({ onSendMessage, isLoading }) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSendMessage(message.trim());
            setMessage('');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex gap-2 items-center">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 p-3 border rounded-lg resize-none max-h-32 min-h-[2.5rem]
                   focus:outline-none focus:ring-2 focus:ring-primary
                   transition-all duration-200"
                    disabled={isLoading || isSubmitting}
                    rows={1}
                />
                <button
                    type="submit"
                    className="p-3 bg-primary text-white rounded-full hover:bg-secondary
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform transition-all duration-200 hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={!message.trim() || isLoading || isSubmitting}
                >
                    <Send size={20} />
                </button>
            </div>
        </form>
    );
};