import { ChatProvider } from "../../store/chat/chatStore";
import Chat from "./main_components/Chat";
import { Swiper } from "./main_components/Swiper";
import './main_components/styles/swiper.scss'

const HomeMain = (props) => {
    return (
      <div className="home-container">
          <ChatProvider>
            <Chat />
          </ChatProvider>
          
          <Swiper />
      </div>
    );
}

export default HomeMain;