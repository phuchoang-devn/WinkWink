import { createContext, useContext, useEffect } from 'react';
import { useImmerReducer } from "use-immer";
import { initialChat, chatReducer } from './chatReducer';
import { chatThunk } from './chatThunk';
import { useWS } from '../webSocket';
import { useAuth } from '../../static/js/context_providers/auth_provider';

const ChatContext = createContext(null);

const ChatDispatchContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [chatStore, dispatch] = useImmerReducer(
        chatReducer,
        initialChat
    );
    const asyncDispatch = chatThunk(chatStore, dispatch);

    const { user } = useAuth();
    const { wsChat } = useWS();

    useEffect(() => {
        if(!wsChat) return

        dispatch({
            type: ChatAction.NEW_CHAT,
            payload: wsChat
        })
    }, [wsChat, dispatch])

    useEffect(() => {
        if(!user) return

        asyncDispatch({
            type: ChatAction.GET_METADATA
        })
    }, [user])

    return (
        <ChatContext.Provider value={chatStore}>
            <ChatDispatchContext.Provider value={asyncDispatch}>
                {children}
            </ChatDispatchContext.Provider>
        </ChatContext.Provider>
    );
}

export const useChatStore = () => {
    return useContext(ChatContext);
}

export const useChatDispatch = () => {
    return useContext(ChatDispatchContext);
}

export const ChatAction = Object.freeze({
    START_LOADING: "chat/start",
    GET_METADATA: "chat/getMetadata",
    DELETE_METADATA: "chat/delMetadata",
    NEW_METADATA: "chat/newMetadata",
    IS_SEEN: "chat/isSeen",
    UNMATCH: "chat/unmatch",
    LOAD_CHAT: "chat/loadChat",
    SEND_MESSAGE: "chat/sendMessage",
    NEW_CHAT: "chat/newChat"
})