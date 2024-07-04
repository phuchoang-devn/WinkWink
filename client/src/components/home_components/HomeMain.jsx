import { useNavigate } from "react-router-dom";
import { useUser } from "../../context_providers/auth_provider";
import Chat from "./main_components/Chat";
import { Swiper } from "./main_components/Swiper";
import './main_components/styles/swiper.scss'
import { useEffect } from "react";

const HomeMain = (props) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate("/profile")
  }, [])

  return (
    <div className="home-container">
      <Chat />
      <Swiper />
    </div>
  );
}

export default HomeMain;