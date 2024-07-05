import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { SECRET_KEY } from "../../main.js";

const SocketAction = {
    AUTH_SERVER: "auth-server",
    CHAT: "chat",
    MATCH: "match"
}

const unauthenticatedConn = {}

const userConns = {}
const connAndUserMap = {}

const winkwinkConn = []

const authenticateConnection = (connId, userId) => {
    if (unauthenticatedConn[connId]) {
        userConns[userId] = unauthenticatedConn[connId];
        connAndUserMap[connId] = userId;
        delete unauthenticatedConn[connId];
        return ({
            auth: true
        })
    } else if (userConns[userId])
        return ({
            auth: false,
            isExisted: true
        })
    else return ({
        auth: false,
        isExisted: false
    })
}

const deleteUnauthConnection = (connId) => {
    unauthenticatedConn[connId].close();
    delete unauthenticatedConn[connId];
}

const createWebSocketServer = () => {
    const wss = new WebSocketServer({
        port: process.env.WS_PORT || 8000
    })

    wss.on("connection", connection => {
        const connID = uuidv4();

        unauthenticatedConn[connID] = connection;
        const response = {
            type: "auth",
            conn: connID
        }
        connection.send(JSON.stringify(response));

        connection.on("message", data => {
            const message = JSON.parse(data);

            if (message.type === SocketAction.AUTH_SERVER) {
                try {
                    const decoded = jwt.verify(message.token, SECRET_KEY);

                    if (unauthenticatedConn[decoded.conn]) {
                        delete unauthenticatedConn[decoded.conn];
                        winkwinkConn.push(connID);
                        console.log("WinkWink connection established");
                    }
                } catch (error) {
                    if (error instanceof jwt.JsonWebTokenError) {
                        connection.close();
                        delete unauthenticatedConn[decoded.conn];
                        console.log(`Failed to authenticate server connection`)
                    }
                }
            } else if (winkwinkConn.includes(connID)) {
                const { receiver } = message.payload;
                const receiverConn = userConns[receiver];

                if (!receiverConn) return

                switch (message.type) {
                    case SocketAction.CHAT: {
                        const { content } = message.payload;

                        receiverConn.send(JSON.stringify({
                            type: message.type,
                            payload: content
                        }));

                        break;
                    }

                    case SocketAction.MATCH: {
                        const { chatMetadata } = message.payload;
                        
                        receiverConn.send(JSON.stringify({
                            type: message.type,
                            payload: chatMetadata
                        }));

                        break;
                    }

                    default:
                        console.error("Web Socket: Unknown message type")
                }
            } else console.log(`Message from unauthenticated server "${connID}"`)
        })

        connection.on('close', () => {
            const userId = connAndUserMap[connID];

            if (userId) {
                delete userConns[userId];
                delete connAndUserMap[connID];
            }
        });
    })
}

export {
    SocketAction,
    authenticateConnection,
    deleteUnauthConnection
}

export default createWebSocketServer