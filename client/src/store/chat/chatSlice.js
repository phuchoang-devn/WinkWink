import { useEffect } from 'react';
import { useImmerReducer } from "use-immer";
import { initialChat, chatReducer } from './chatReducer';
import { chatThunk } from './chatThunk';
import { useUser } from '../../context_providers/auth_provider';
import useWebSocket from '../webSocket';
import { createInternalDispatch } from '..';


const ChatSlice = () => {
    const [chatStore, dispatch] = useImmerReducer(
        chatReducer,
        initialChat
    );
    const internalDispatch = createInternalDispatch(dispatch)
    const asyncDispatch = chatThunk(chatStore, internalDispatch);

    const { user } = useUser();
    const ws = useWebSocket();

    useEffect(() => {
        if(!ws) return

        asyncDispatch(ws)
    }, [ws])

    useEffect(() => {
        if(!user) return

        asyncDispatch({
            type: ChatAction.GET_METADATA
        })
    }, [user])

    return [chatStore, asyncDispatch];
}

export const ChatAction = Object.freeze({
    START_LOADING: "chat/start",

    GET_METADATA: "chat/getMetadata",
    GET_THUMB_IMAGE: "chat/getThumgImage",
    NEW_METADATA: "chat/newMetadata",
    IS_SEEN: "chat/isSeen",
    UNMATCH: "chat/unmatch",
    LOAD_CHAT: "chat/loadChat",
    SEND_MESSAGE: "chat/sendMessage",
    NEW_CHAT: "chat/newChat"
})

export default ChatSlice