import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';

export const ChatPage = () => {
    return (
        <section className="flex mt-14 h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden max-w-[1400px] mx-auto">
            <ChatList />
            <ChatWindow />
        </section>
    )
}
