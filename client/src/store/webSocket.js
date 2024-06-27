import { useEffect, useState } from 'react';
import { useUser } from '../static/js/context_providers/auth_provider';
import { ChatAction } from './chat/chatSlice';

const useWebSocket = () => {
    const [ws, setWS] = useState(undefined);

    const { user } = useUser();

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
                    setWS({
                        type: ChatAction.NEW_CHAT,
                        payload: message.payload
                    })
                    break;
                }

                case "match": {
                    setWS({
                        type: ChatAction.NEW_METADATA,
                        payload: message.payload
                    })
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

    return ws;
}

export default useWebSocket