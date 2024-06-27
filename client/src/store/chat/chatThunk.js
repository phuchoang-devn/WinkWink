import { ChatAction } from "./chatSlice";

export const chatThunk = (chatStore, dispatch) => async ({ type, payload }) => {
    if (chatStore.isLoading) return

    await dispatch({
        type: ChatAction.START_LOADING
    })

    const crossAsyncDispatch = chatThunk(chatStore, dispatch);


    switch (type) {
        case ChatAction.GET_METADATA: {
            let url = "/api/chatmetadata";

            if (chatStore.matchedUserIds.length !== 0) {
                const lastFetchedUser = chatStore.matchedUserIds.at(-1)
                url += `/${chatStore.metadatas[lastFetchedUser].updatedAt}`
            }

            try {
                const response = await fetch(url, { credentials: "include" });

                if (response.ok) {
                    var metadatas = await response.json();

                    dispatch({
                        type,
                        payload: metadatas
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }

            if (Array.isArray(metadatas))
                metadatas.map(m => crossAsyncDispatch({
                    type: ChatAction.GET_THUMB_IMAGE,
                    payload: m.matchedUserId
                }))

            break;
        }

        case ChatAction.GET_THUMB_IMAGE: {
            const id = payload

            try {
                const res = await fetch(`/api/image/chat/${id}`, { credentials: "include" });

                if (res.ok) {
                    const blob = await res.blob();
                    const imgUrl = URL.createObjectURL(blob);

                    dispatch({
                        type,
                        payload: {
                            id,
                            img: imgUrl
                        }
                    })
                } else throw Error(await res.text())
            } catch (error) {
                console.log(error.message)
            }

            break;
        }

        case ChatAction.LOAD_CHAT: {
            const matchedUserId = payload

            let url = `/api/chats/${matchedUserId}`

            const loadedChat = chatStore.chats[matchedUserId];
            if (loadedChat) {
                const lastChatOrder = loadedChat.at(-1).order;

                if (lastChatOrder === 0) break
                else url += `/${lastChatOrder}`
            }

            try {
                const response = await fetch(url, { credentials: "include" });

                if (response.ok) {
                    const chats = await response.json();
                    dispatch({
                        type,
                        payload: {
                            matchedUserId,
                            chats
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

        case ChatAction.NEW_METADATA: {
            const metadata = payload

            const isImageFetched = chatStore.matchedUserIds.includes(metadata.matchedUserId);

            if (!isImageFetched) {
                try {
                    const res = await fetch(`/api/image/chat/${metadata.matchedUserId}`, { credentials: "include" });

                    if (res.ok) {
                        const blob = await res.blob();
                        const imgUrl = URL.createObjectURL(blob);

                        dispatch({
                            type,
                            payload: {
                                ...metadata,
                                image: imgUrl
                            }
                        })
                    } else throw Error(await res.text());
                } catch (error) {
                    console.log(error.message)
                }
            } else {
                dispatch({ type, payload })
            }

            break;
        }

        case ChatAction.UNMATCH: {
            const userId = payload

            try {
                const res = await fetch(`/api/unmatch`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId
                    }),
                    credentials: "include"
                });

                if (res.ok) {
                    dispatch({ type, payload })
                } else throw Error(await res.text());
            } catch (error) {
                console.log(error.message)
            }

            break;
        }

        case ChatAction.NEW_CHAT: {
            dispatch({ type, payload })
            break
        }

        default:
            throw Error('Unknown action: ' + type);
    }
}