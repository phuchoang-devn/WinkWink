import { ReactComponent as FakePic } from "../../../../static/image/profile/default-user-image.svg"
import { ReactComponent as Send } from "../../../../static/image/chat/send.svg"
import { ReactComponent as Down } from "../../../../static/image/chat/down-circle.svg"
import { useEffect, useRef, useState } from "react";
import { ChatAction, useChatDispatch, useChatStore } from "../../../../store/chat/chatStore";

const ChatCompose = ({ partnerId }) => {
    const chatStore = useChatStore();
    const isSeen = chatStore.metadatas[partnerId]?.isSeen
    const dispatch = useChatDispatch();

    const [newMessage, setNewMessage] = useState("");
    const contentRef = useRef(null);
    const [isOnBottom, setIsOnBottom] = useState(true);

    useEffect(() => {
        if (!partnerId) return

        setNewMessage("");

        const ref = contentRef.current;
        ref.scrollTop = 0;
    }, [partnerId])

    const handleInput = async (e) => {
        setNewMessage(e.target.value)
        await handleSeen()
    }

    const handleSendMessgae = (e) => {
        e.preventDefault();
        dispatch({
            type: ChatAction.SEND_MESSAGE,
            payload: {
                matchedUserId: partnerId,
                content: newMessage
            }
        })
        setNewMessage("")
    }

    const handleScroll = (e) => {
        if (e.target.scrollTop <= -1 && isOnBottom)
            setIsOnBottom(false)
        else if (e.target.scrollTop > -1 && !isOnBottom)
            setIsOnBottom(true)
    }

    const scrollToBottom = async () => {
        contentRef.current.scrollTop = 0
        await handleSeen()
    }

    const handleSeen = async () => {
        if(!isSeen && contentRef.current.scrollTop > -1)
            await dispatch({
                type: ChatAction.IS_SEEN,
                payload: partnerId
            })
    }

    return (
        <div className="chat-compose"
            style={{
                width: partnerId ? "30rem" : 0,
                padding: partnerId ? "1rem" : 0,
                backgroundColor: isSeen || !partnerId ? "var(--colorLight)" : "var(--colorDark)"
            }}
            onMouseDown={handleSeen}>
            <div className="top">
                <FakePic className="partner-pic" />
                <div className="partner-name">
                    {partnerId ? chatStore.metadatas[partnerId]?.matchedUserName : ""}
                </div>
                <div className="partner-blank"></div>
            </div>

            <div className="messages"
                ref={contentRef}
                onScroll={handleScroll}
            >
                {
                    partnerId ?
                        chatStore.chats[partnerId]?.map(chat => (
                            <div key={chat.id}
                                className="message"
                                style={
                                    chat.isMine ? {
                                        backgroundColor: isSeen || !partnerId ? "var(--colorDark)" : "var(--colorLight)",
                                        color: isSeen || !partnerId ? "var(--colorLight)" : "black",
                                        marginLeft: "auto"
                                    } : {
                                        backgroundColor: isSeen || !partnerId ? "var(--colorMiddle)" : "var(--colorLight)"
                                    }
                                }
                            >
                                <div className="message-content">{chat.content}</div>
                                <div className="message-createdAt">{getDisplayTime(chat.createdAt)}</div>
                            </div>
                        ))
                        : null
                }
                {
                    partnerId && !isOnBottom ?
                        <Down className="down-button" onClick={scrollToBottom} />
                        : null
                }
            </div>

            <form className="bottom" onSubmit={handleSendMessgae}>
                <input placeholder="Type a message"
                    value={newMessage}
                    onChange={handleInput} />
                {
                    newMessage.length !== 0 ?
                        <button type="submit">
                            <Send className="send-icon" />
                        </button>
                        : null
                }
            </form>
        </div>
    )
}

const getDisplayTime = (time) => {
    const pastTime = new Date(time);
    const currentTime = new Date();

    const isToday = pastTime.getFullYear() === currentTime.getFullYear()
        && pastTime.getMonth() === currentTime.getMonth()
        && pastTime.getDate() === currentTime.getDate();

    const modifyNum = (number) => {
        return number < 10 ? `0${number}` : number;
    }

    const hourAndMinute = `${modifyNum(pastTime.getUTCHours())}:${modifyNum(pastTime.getUTCMinutes())}`

    if (isToday) return hourAndMinute
    else return `${hourAndMinute} ${modifyNum(pastTime.getUTCDate())}/${modifyNum(pastTime.getUTCMonth() + 1)}/${modifyNum(pastTime.getUTCFullYear())}`
}

export default ChatCompose