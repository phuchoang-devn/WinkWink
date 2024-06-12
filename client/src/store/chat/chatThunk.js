import { ChatAction } from "./chatStore";

export const chatThunk = (chatStore, dispatch) => async ({ type, payload }) => {
    switch (type) {
        case ChatAction.GET_METADATA: {
            try {
                const response = await fetch(`/api/chatmetadata/${chatStore.nextPage}`, {
                    credentials: "include"
                });

                if (response.ok) {
                    dispatch({
                        type,
                        payload: await response.json()
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }
            break;
        }

        case ChatAction.LOAD_CHAT: {
            const matchedUserId = payload
            try {
                const response = await fetch(`/api/chats/${matchedUserId}/${chatStore.metadatas[matchedUserId].nextPage}`, {
                    credentials: "include"
                });

                if (response.ok) {
                    const json = await response.json();
                    dispatch({
                        type,
                        payload: {
                            matchedUserId,
                            ...json
                        }
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }
            break;
        }

        case ChatAction.SEND_MESSAGE: {
            const { matchedUserId, content } = payload
            try {
                const response = await fetch(`/api/chat/${matchedUserId}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content }),
                    credentials: "include"
                });

                if (response.ok) {
                    const newChat = await response.json();
                    dispatch({
                        type,
                        payload: {
                            matchedUserId,
                            newChat
                        }
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }
            break;
        }

        case ChatAction.IS_SEEN: {
            const matchedUserId = payload
            const metadata = chatStore.metadatas[matchedUserId]
            try {
                const response = await fetch(`/api/chatmetadata/seen/${metadata.id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        isSeen: !metadata.isSeen
                    }),
                    credentials: "include"
                });

                if (response.ok) {
                    dispatch({
                        type,
                        payload: {
                            matchedUserId,
                            newState: !metadata.isSeen
                        }
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }
            break;
        }

        default:
            throw Error('Unknown action: ' + type);
    }
}