import { ChatAction } from "./chatSlice";

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
            isUnmatched,

            firstFetch: boolean,
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
    if (!action.type.startsWith("chat/")) return

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
                    store.metadatas[m.matchedUserId] = {
                        ...m,
                        firstFetch: false
                    };
                }
            });

            break;
        }

        case ChatAction.GET_THUMB_IMAGE: {
            const { id, img } = action.payload;

            store.metadatas[id].image = img;
            break;
        }

        case ChatAction.LOAD_CHAT: {
            const { matchedUserId, chats } = action.payload;

            if (store.chats[matchedUserId])
                store.chats[matchedUserId].push(...chats)
            else {
                store.metadatas[matchedUserId].firstFetch = true
                store.chats[matchedUserId] = chats
            }

            break;
        }

        case ChatAction.SEND_MESSAGE: {
            const { matchedUserId, newChat } = action.payload;

            const modifiedChat = {
                isMine: true,
                ...newChat
            }

            if (store.chats[matchedUserId])
                store.chats[matchedUserId].unshift(modifiedChat)
            else store.chats[matchedUserId] = [modifiedChat]

            store.metadatas[matchedUserId].lastMessage = newChat.content.substring(0, 50);
            store.metadatas[matchedUserId].total += 1;

            break;
        }

        case ChatAction.IS_SEEN: {
            const { matchedUserId, newState } = action.payload;

            store.metadatas[matchedUserId].isSeen = newState;

            break;
        }

        case ChatAction.NEW_CHAT: {
            const { sender, chat } = action.payload;

            store.metadatas[sender] = {
                ...store.metadatas[sender],
                updatedAt: chat.createdAt,
                isSeen: false,
                lastMessage: chat.content.substring(0, 50),
                total: chat.order + 1
            }

            const modifiedChat = {
                isMine: false,
                ...chat
            }

            if (store.chats[sender])
                store.chats[sender].unshift(modifiedChat)
            else store.chats[sender] = [modifiedChat]

            break;
        }

        case ChatAction.NEW_METADATA: {
            const metadata = action.payload
            const matchedUserId = metadata.matchedUserId

            store.matchedUserIds = store.matchedUserIds.filter(id => id !== matchedUserId)
            store.matchedUserIds.unshift(matchedUserId)

            store.metadatas[matchedUserId] = {
                image: store.metadatas[matchedUserId]?.image,
                ...metadata,
                firstFetch: false
            }

            break;
        }

        case ChatAction.UNMATCH: {
            const matchedUserId = action.payload
            store.metadatas[matchedUserId].isUnmatched = true

            break;
        }

        default:
            throw Error('Unknown action: ' + action.type);
    }

    if (action.type !== ChatAction.START_LOADING)
        store.isLoading = false
}