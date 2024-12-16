import { MessageSquare } from 'lucide-react';

export const EmptyChatWindow = () => (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Selecciona un chat para comenzar</p>
        </div>
    </div>
);