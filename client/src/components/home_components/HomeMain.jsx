import { ChatProvider } from "../../store/chat/chatStore";
import Chat from "./main_components/Chat";

const HomeMain = (props) => {
    return (
        <div>
            <ChatProvider>
                <Chat />
            </ChatProvider>
        </div>
    );
}

export default HomeMain;