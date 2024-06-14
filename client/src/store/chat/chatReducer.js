import { ChatAction } from "./chatStore";

export const initialChat = {
    isLoading: false,
    matchedUserIds: [],
    metadatas: {/*
        [matchedUserId]: {
            id,
            matchedUser,
            matchedUserName,
            lastMessage,
            isSeen,
            total,
            updatedAt,

            image
        }
    */},
    chats: {/*
        [matchedUserId]: [{
            id,
            isMine,
            content,
            createdAt,
            order
        }]
    */}

}

export const chatReducer = (store, action) => {
    switch (action.type) {
        case ChatAction.START_LOADING: {
            store.isLoading = true;
            break;
        }

        case ChatAction.GET_METADATA: {
            const metadatas = action.payload;

            metadatas.forEach(m => {
                if (!store.matchedUserIds.includes(m.matchedUserId)) {
                    store.matchedUserIds.push(m.matchedUserId);
                    store.metadatas[m.matchedUserId] = m;
                }
            });

            store.isLoading = false
            break;
        }

        case ChatAction.LOAD_CHAT: {
            const { matchedUserId, chats } = action.payload;

            if (store.chats[matchedUserId])
                store.chats[matchedUserId].push(...chats)
            else store.chats[matchedUserId] = chats

            store.isLoading = false
            break;
        }

        case ChatAction.SEND_MESSAGE: {
            const { matchedUserId, newChat } = action.payload;

            store.chats[matchedUserId].unshift({
                isMine: true,
                ...newChat
            })

            store.metadatas[matchedUserId].lastMessage = newChat.content.substring(0, 50);

            store.isLoading = false
            break;
        }

        case ChatAction.IS_SEEN: {
            const { matchedUserId, newState } = action.payload;

            store.metadatas[matchedUserId].isSeen = newState;

            store.isLoading = false
            break;
        }

        case ChatAction.NEW_CHAT: {
            const { sender, chat } = action.payload;

            store.metadatas[sender] = {
                ...store.metadatas[sender],
                updatedAt: chat.createdAt,
                isSeen: false,
                lastMessage: chat.content.substring(0, 50)
            }

            if (store.chats[sender])
                store.chats[sender].unshift({
                    isMine: false,
                    ...chat
                })

            store.isLoading = false
            break;
        }

        default:
            throw Error('Unknown action: ' + action.type);
    }
}