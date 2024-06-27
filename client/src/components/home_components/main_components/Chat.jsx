import "./styles/chat.scss"
import { useEffect, useState } from "react"
import { ReactComponent as Collapse } from "../../../static/image/chat/collapse-circle.svg"
import { ReactComponent as NoPartner } from "../../../static/image/chat/heart-padlock.svg"
import MetadataCard from "./chat_components/MetadataCard"
import ChatCompose from "./chat_components/ChatCompose"
import { useAppStore } from "../../../store"

const Chat = () => {
    const { chatStore } = useAppStore();
    const [chatPartner, setChatPartner] = useState(undefined);
    const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getWidth = () => {
        if (windowWidth <= 430) {
            return isMetadataExpanded ? "22.5rem" : "5rem";
        } else {
            return isMetadataExpanded ? "25rem" : "5rem";
        }
    };


    useEffect(() => {
        if (chatPartner) setIsMetadataExpanded(false)
    }, [chatPartner])

    useEffect(() => {
        if (!chatPartner) return
        if (isMetadataExpanded) setChatPartner(undefined)
    }, [isMetadataExpanded])

    return (
        <div className="chat-container">
            <div className="metadata"
                style={{
                    // width: isMetadataExpanded ? "25rem" : "5rem",
                    width: getWidth(),
                }}>
                <div className="matched-users"
                    style={{
                        height: isMetadataExpanded ? "100%" : "85%"
                    }}>
                    {
                        chatStore.matchedUserIds.length === 0 ?
                            <div className="no-message">
                                <NoPartner className="no-message__icon"
                                    style={{
                                        height: isMetadataExpanded ? "120px" : "60px",
                                        width: isMetadataExpanded ? "120px" : "60px",
                                    }} />

                                <div className="no-message__text"
                                    style={{
                                        width: isMetadataExpanded ? "100%" : 0
                                    }}>
                                    <b>Let's Wink! Someone is waiting for you!</b>
                                </div>
                            </div>
                            : <>
                                {
                                    chatStore.matchedUserIds.map(id => {
                                        let metadata = chatStore.metadatas[id];
                                        return (
                                            <MetadataCard key={id}
                                                metadata={metadata}
                                                isOnlyAvatar={!isMetadataExpanded}
                                                openChat={setChatPartner}
                                            />
                                        )
                                    }
                                    )
                                }
                                <div className="end-metadata__text"
                                    style={{
                                        visibility: isMetadataExpanded ? "visible" : "hidden"
                                    }}
                                >
                                    <b>Let's Wink to find more friends!</b>
                                </div>
                            </>

                    }
                </div>

                <div className="collapse-container"
                    onClick={() => setIsMetadataExpanded(state => !state)}
                    style={{
                        rotate: isMetadataExpanded ? "-180deg" : "unset",
                    }}>
                    <Collapse className="collapse" />
                </div>
            </div>

            <ChatCompose
                partnerId={chatPartner}
            />
        </div>
    )
}

export default Chat