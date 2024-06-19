import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../static/js/context_providers/auth_provider';

const WSContext = createContext(null);

const WSResetContext = createContext(null);

export const WSProvider = ({ children }) => {
    const [wsChat, setWsChat] = useState(undefined);
    const [wsMetadata, setWsMetadata] = useState(undefined);

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return

        const ws = new WebSocket('ws://localhost:8000');

        ws.addEventListener("message", async (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "auth": {
                    try {
                        const response = await fetch(`/api/ws`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                conn: message.conn
                            }),
                            credentials: "include"
                        });

                        if (response.ok) {
                            console.log("ws connection established")
                        } else throw Error(await response.text());
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                }

                case "chat": {
                    setWsChat(message.payload);
                    break;
                }

                case "match": {
                    setWsMetadata(message.payload)
                    break;
                }

                default:
                    console.error("Unknown message type from ws server")
            }
        })

        ws.addEventListener('close', () => {
            console.error('ws disconnected');
        });

        return () => ws.close()
    }, [user])

    const resetValue = () => {
        setWsChat(undefined);
        setWsMetadata(undefined);
    }

    return (
        <WSContext.Provider value={{ wsChat, wsMetadata }}>
            <WSResetContext.Provider value={resetValue}>
                {children}
            </WSResetContext.Provider>
        </WSContext.Provider>
    );
}

export const useWS = () => {
    return useContext(WSContext);
}

export const useWSReset = () => {
    return useContext(WSResetContext);
}