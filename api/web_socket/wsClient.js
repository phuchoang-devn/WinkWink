import WebSocket from "ws";
import jwt from 'jsonwebtoken';
import { SocketAction } from "./wsServer.js";

let ws = undefined;

const sendSocketMessage = (data) => {
    ws.send(JSON.stringify(data))
}

const createWebSocketClient = () => {
    ws = new WebSocket('ws://localhost:8000');

    ws.on("message", data => {
        const { conn } = JSON.parse(data);

        const token = jwt.sign(
            { conn },
            process.env.AUTH_KEY,
		/* TODO: after finish with docker
		{ 
			algorithm: 'RS256' 
		}*/);

        sendSocketMessage({
            type: SocketAction.AUTH_SERVER,
            token
        })
    })
}

export { sendSocketMessage }
export default createWebSocketClient