import { useDeferredValue, useEffect, useRef } from 'react';
import { useImmerReducer } from "use-immer";
import { initialWink, winkReducer } from './winkReducer';
import { winkThunk } from './winkThunk';
import { useUser } from '../../context_providers/auth_provider';
import { createInternalDispatch } from '..';
var _ = require('lodash');

const pickFields = ["age", "sex", "language", "country", "preferences"]

const WinkSlice = () => {
    const [winkStore, dispatch] = useImmerReducer(
        winkReducer,
        initialWink
    );
    const internalDispatch = createInternalDispatch(dispatch);
    const asyncDispatch = winkThunk(winkStore, internalDispatch);

    const { user } = useUser();
    const defferedUser = useDeferredValue(user);
    const firstFetch = useRef(false)

    useEffect(() => {
        if (!user) return

        if (!firstFetch.current) {
            firstFetch.current = true

            asyncDispatch({
                type: WinkAction.GET_USERS
            })

            return
        }

        const pickedUser = _.pick(user, pickFields);
        const pickedDefferredUser = _.pick(defferedUser, pickFields);
        if (!firstFetch.current || !_.isEqual(pickedUser, pickedDefferredUser)) {
            asyncDispatch({
                type: WinkAction.REFRESH_USERS
            })
        }
    }, [user])

    return [winkStore, asyncDispatch];
}

export const WinkAction = Object.freeze({
    START_LOADING: "wink/start",

    GET_USERS: "wink/getUsers",
    REFRESH_USERS: "wink/refreshUsers",  //get new users after changing profile
    GET_IMAGES: "wink/getImages",
    WINK: "wink/wink"
})

export default WinkSlice