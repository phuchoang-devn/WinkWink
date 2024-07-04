import { ChatAction } from "../chat/chatSlice";
import { WinkAction } from "./winkSlice";

// MIN_OF_HOLDING_USERS is a number under 10
const MIN_OF_HOLDING_USERS = 5;

export const winkThunk = (winkStore, dispatch) => async ({ type, payload }) => {
    if (winkStore.isLoading) return

    dispatch({
        type: WinkAction.START_LOADING
    })

    const crossAsyncDispatch = winkThunk(winkStore, dispatch);

    switch (type) {
        case WinkAction.GET_USERS: {
            let url = `/api/wink?`

            winkStore.userIds.forEach(id => url += `except[]=${id}&`)

            try {
                const response = await fetch(url, { credentials: "include" });

                if (response.ok) {
                    var newUsers = await response.json();
                    dispatch({
                        type,
                        payload: newUsers
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }

            if (Array.isArray(newUsers))
                newUsers.forEach(async user => await crossAsyncDispatch({
                    type: WinkAction.GET_IMAGES,
                    payload: user.id
                }))

            break;
        }

        case WinkAction.REFRESH_USERS: {
            dispatch({ type });
            crossAsyncDispatch({
                type: WinkAction.GET_USERS
            })

            break;
        }

        case WinkAction.GET_IMAGES: {
            const id = payload

            try {
                const response = await fetch(`/api/image/profile/${id}`, { credentials: "include" });

                if (response.ok) {
                    const blob = await response.blob();
                    const imgUrl = URL.createObjectURL(blob);
                    dispatch({
                        type,
                        payload: {
                            userId: id,
                            img: imgUrl
                        }
                    })
                } else throw Error(await response.text());
            } catch (error) {
                console.log(error.message)
            }
            break;
        }

        case WinkAction.WINK: {
            const { id, isWink } = payload

            try {
                const response = await fetch(`/api/wink`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, isWink }),
                    credentials: "include"
                });

                if (response.ok) {
                    dispatch({
                        type,
                        payload: id
                    })

                    if (isWink) {
                        const { isMatched, chatMetadata } = await response.json();

                        if (isMatched) {
                            const res = await fetch(`/api/image/chat/${chatMetadata.matchedUserId}`, { credentials: "include" });

                            if (res.ok) {
                                const blob = await res.blob();
                                const imgUrl = URL.createObjectURL(blob);

                                dispatch({
                                    type: ChatAction.NEW_METADATA,
                                    payload: {
                                        ...chatMetadata,
                                        image: imgUrl
                                    }
                                })
                            } else {
                                dispatch({
                                    type: ChatAction.NEW_METADATA,
                                    payload: chatMetadata
                                })
                            }
                        }
                    }

                    if (winkStore.userIds.length <= MIN_OF_HOLDING_USERS + 1)
                        crossAsyncDispatch({
                            type: WinkAction.GET_USERS
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