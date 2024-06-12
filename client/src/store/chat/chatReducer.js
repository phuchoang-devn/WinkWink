import { ChatAction } from "./chatStore";

export const initialChat = {
    nextPage: 0,
    matchedUserIds: [],
    metadatas: {/*
        [matchedUserId]: {
            id,
            matchedUser,
            matchedUserName,
            lastMessage,
            isSeen,
            updatedAt,

            image,
            nextPage - dafault 0
        }
    */},
    chats: {/*
        [matchedUserId]: [{
            id,
            isMine,
            content,
            createdAt
        }]
    */}

}

export const chatReducer = (store, action) => {
    switch (action.type) {
        case ChatAction.GET_METADATA: {
            const { page, metadatas } = action.payload;

            metadatas.forEach(m => {
                if (!store.matchedUserIds.includes(m.matchedUserId)) {
                    store.matchedUserIds.push(m.matchedUserId);
                    store.metadatas[m.matchedUserId] = {
                        nextPage: 0,
                        ...m
                    };
                }
            });

            if (store.nextPage === page)
                store.nextPage += 1;
            break;
        }

        case ChatAction.LOAD_CHAT: {
            const { matchedUserId, chats, page } = action.payload;

            if (store.chats[matchedUserId])
                store.chats[matchedUserId].concat(chats)
            else store.chats[matchedUserId] = chats

            if (store.metadatas[matchedUserId].nextPage === page)
                store.metadatas[matchedUserId].nextPage += 1;
            break;
        }

        case ChatAction.SEND_MESSAGE: {
            const { matchedUserId, newChat } = action.payload;

            store.chats[matchedUserId].unshift({
                isMine: true,
                ...newChat
            })

            store.metadatas[matchedUserId].lastMessage = newChat.content.substring(0, 50);
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
                lastMessage: chat.content.substring(0, 50)
            }

            if (store.chats[sender])
                store.chats[sender].unshift({
                    isMine: false,
                    ...chat
                })
            break;
        }

        default:
            throw Error('Unknown action: ' + action.type);
    }
}