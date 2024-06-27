import { createContext, useContext } from 'react';
import ChatSlice from './chat/chatSlice';
import WinkSlice from './wink/winkSlice';

const StoreContext = createContext(null);
const StoreDispatchContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const [chatStore, chatDispatch] = ChatSlice();
    const [winkStore, winkDispatch] = WinkSlice();

    return (
        <StoreContext.Provider value={{ chatStore, winkStore }}>
            <StoreDispatchContext.Provider value={{ chatDispatch, winkDispatch }}>
                {children}
            </StoreDispatchContext.Provider>
        </StoreContext.Provider>
    );
}

const internalDispatches = []
export const createInternalDispatch = (dispatch) => {
    if (!internalDispatches.includes(dispatch))
        internalDispatches.push(dispatch)

    const compoundDispatch = (action) => {
        internalDispatches.forEach(d => d(action))
    }

    return compoundDispatch
}

export const useAppStore = () => {
    return useContext(StoreContext);
}

export const useAppDispatch = () => {
    return useContext(StoreDispatchContext);
}