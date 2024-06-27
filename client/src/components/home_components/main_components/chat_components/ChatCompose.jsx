import { ReactComponent as FakePic } from "../../../../static/image/profile/default-user-image.svg"
import { ReactComponent as Send } from "../../../../static/image/chat/send.svg"
import { ReactComponent as Down } from "../../../../static/image/chat/down-circle.svg"
import { ReactComponent as Winking } from "../../../../static/image/chat/winking.svg"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChatAction } from "../../../../store/chat/chatSlice";
import { useAppDispatch, useAppStore } from "../../../../store";

const ChatCompose = ({ partnerId }) => {
    const { chatStore } = useAppStore();
    const metadata = chatStore.metadatas[partnerId];
    const chats = chatStore.chats[partnerId];
    const { chatDispatch } = useAppDispatch();

    const [newMessage, setNewMessage] = useState("");
    const contentRef = useRef(null);
    const currentPos = useRef(0);
    const [isOnBottom, setIsOnBottom] = useState(true);
    const [isLoadChatLocked, setIsLoadChatLocked] = useState(false); //Local lock to totally prevent duplicated fetch 

    useEffect(() => {
        if (!partnerId) return

        setNewMessage("");
        contentRef.current.scrollTop = 0;
        setIsOnBottom(true);
    }, [partnerId])

    useLayoutEffect(() => {
        if (!chats) return

        currentPos.current = contentRef.current.scrollTop;
    }, [chats])

    useEffect(() => {
        if (!chats) return

        contentRef.current.scrollTop = currentPos.current;
        setIsLoadChatLocked(false);
    }, [chats])

    const handleInput = async (e) => {
        setNewMessage(e.target.value)
        await handleSeen()
    }

    const handleSendMessgae = (e) => {
        e.preventDefault();
        if (newMessage.length === 0) return

        chatDispatch({
            type: ChatAction.SEND_MESSAGE,
            payload: {
                matchedUserId: partnerId,
                content: newMessage
            }
        })
        setNewMessage("")
    }

    const handleScroll = async (e) => {
        if (!partnerId || metadata.total === 0) return

        if (e.target.scrollTop <= -1) {
            if (isOnBottom) setIsOnBottom(false)

            const isAllOrIsLoading = chats.at(-1).order === 0 || chatStore.isLoading;
            if (isAllOrIsLoading) return

            const lineForLoadingMoreChats = (contentRef.current.clientHeight - contentRef.current.scrollHeight) + 200
            if (e.target.scrollTop < lineForLoadingMoreChats && !isLoadChatLocked) {
                setIsLoadChatLocked(true)
                await chatDispatch({
                    type: ChatAction.LOAD_CHAT,
                    payload: partnerId
                })
            }

        } else if (e.target.scrollTop > -1 && !isOnBottom) {
            setIsOnBottom(true);

            if (!metadata?.isSeen)
                chatDispatch({
                    type: ChatAction.IS_SEEN,
                    payload: partnerId
                })
        }
    }

    const scrollToBottom = async () => {
        contentRef.current.scrollTop = 0
    }

    const handleSeen = async () => {
        if (!metadata?.isSeen && isOnBottom)
            await chatDispatch({
                type: ChatAction.IS_SEEN,
                payload: partnerId
            })
    }

    return (
        <div className="chat-compose"
            style={{
                width: partnerId ? "25rem" : 0,
                padding: partnerId ? "1rem" : 0,
                backgroundColor: metadata?.isSeen || !partnerId ? "var(--colorLight)" : "var(--colorDark)"
            }}
            onMouseDown={handleSeen}>
            <div className="top">
                <div className="chat-pic">
                    {
                        metadata?.image ?
                            <img src={metadata?.image} alt={metadata.matchedUserName} />
                            : <FakePic className="chat-svg" />
                    }
                </div>

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
                        metadata.total !== 0 ?
                            chats.map(chat => (
                                <div key={chat.id}
                                    className="message"
                                    style={
                                        chat.isMine ? {
                                            backgroundColor: metadata?.isSeen || !partnerId ? "var(--colorDark)" : "var(--colorLight)",
                                            color: metadata?.isSeen || !partnerId ? "var(--colorLight)" : "var(--colorVeryDark)",
                                            marginLeft: "auto"
                                        } : {
                                            backgroundColor: metadata?.isSeen || !partnerId ? "var(--colorMiddle)" : "var(--colorLight)"
                                        }
                                    }
                                >
                                    <div className="message-content">{chat.content}</div>
                                    <div className="message-createdAt">{getDisplayTime(chat.createdAt)}</div>
                                </div>
                            ))
                            : !metadata.isUnmatched ?
                                <div className="new-match">
                                    <Winking className="chat-icon" />
                                    <div className="new-match-message">
                                        Looooook!
                                        <br />
                                        Someone is winking at you
                                    </div>
                                </div>
                                : null
                        : null
                }
                {
                    partnerId && metadata.total !== 0 && !isOnBottom ?
                        <Down className="down-button" onClick={scrollToBottom} />
                        : null
                }
            </div>

            <form className="bottom" onSubmit={handleSendMessgae}>
                <input placeholder={metadata?.isUnmatched ? "Oh nooo! An unmatch :(((" : "Type a message"}
                    value={newMessage}
                    onChange={handleInput}
                    style={{
                        cursor: metadata?.isUnmatched ? "not-allowed" : "unset"
                    }}
                    disabled={metadata?.isUnmatched} />
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