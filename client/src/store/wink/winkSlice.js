import { useEffect } from 'react';
import { useImmerReducer } from "use-immer";
import { initialWink, winkReducer } from './winkReducer';
import { winkThunk } from './winkThunk';
import { useUser } from '../../static/js/context_providers/auth_provider';
import { createInternalDispatch } from '..';

const WinkSlice = () => {
    const [winkStore, dispatch] = useImmerReducer(
        winkReducer,
        initialWink
    );
    const internalDispatch = createInternalDispatch(dispatch);
    const asyncDispatch = winkThunk(winkStore, internalDispatch);

    const { user } = useUser();

    useEffect(() => {
        if (!user) return

        asyncDispatch({
            type: WinkAction.GET_USERS
        })
    }, [user])

    return [winkStore, asyncDispatch];
}

export const WinkAction = Object.freeze({
    START_LOADING: "wink/start",

    GET_USERS: "wink/getUsers",
    GET_IMAGES: "wink/getImages",
    WINK: "wink/wink"
})

export default WinkSlice