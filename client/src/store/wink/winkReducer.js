import { WinkAction } from "./winkSlice";

export const initialWink = {
    isLoading: false,
    userIds: [],
    userInfos: {/*
        [userId]: {
            id,
            fullName,
            age,
            sex,
            country,
            interests,
            language,
        }
    */},
    userImages: {/* 
        [userId]: blob string
    */}
}

export const winkReducer = (store, action) => {
    if(!action.type.startsWith("wink/")) return

    switch (action.type) {
        case WinkAction.START_LOADING: {
            store.isLoading = true;
            break;
        }

        case WinkAction.GET_USERS: {
            const newUsers = action.payload

            newUsers.forEach(user => {
                if(!store.userIds.includes(user.id)) {
                    store.userIds.push(user.id)
                    store.userInfos[user.id] = user
                }
            })

            break;
        }

        case WinkAction.REFRESH_USERS: {
            store.userIds = []
            store.userInfos = {}
            store.userImages = {}

            break;
        }

        case WinkAction.GET_IMAGES: {
            const { userId, img } = action.payload
            store.userImages[userId] = img

            break;
        }

        case WinkAction.WINK: {
            const id = action.payload

            store.userIds = store.userIds.filter(uid => uid !== id)
            delete store.userInfos[id]
            delete store.userImages[id]

            break;
        }

        default:
            throw Error('Unknown action: ' + action.type);
    }

    if (action.type !== WinkAction.START_LOADING)
        store.isLoading = false
}