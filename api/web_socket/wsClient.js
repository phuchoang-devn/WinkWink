import WebSocket from "ws";
import jwt from 'jsonwebtoken';
import { SocketAction } from "./wsServer.js";
import { SECRET_KEY } from "../../main.js";

let ws = undefined;

const sendSocketMessage = (data) => {
    ws.send(JSON.stringify(data))
}

const createWebSocketClient = () => {
    ws = new WebSocket(`ws://localhost:${process.env.WS_PORT || 8000}`);

    ws.on("message", data => {
        const { conn } = JSON.parse(data);

        const token = jwt.sign(
            { conn },
            SECRET_KEY,
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