export const ChatHeader = ({ otherUser }) => {
    if (!otherUser) {
        return (
            <div className="p-4 border-b bg-white shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border-b bg-white shadow-sm">
            <div className="flex items-center justify-center gap-2">
                <div className="relative">
                    {otherUser.online && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                </div>
                <h3 className="text-lg font-semibold">
                    {`${otherUser.first_name} ${otherUser.last_name}`}
                    {otherUser.role_name && (
                        <span className="text-sm text-gray-500 ml-2">({otherUser.role_name})</span>
                    )}
                </h3>
            </div>
        </div>
    );
};
