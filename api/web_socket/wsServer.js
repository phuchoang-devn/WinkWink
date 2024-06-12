import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const SocketAction = {
    AUTH_SERVER: "auth-server",
    CHAT: "chat"
}

const conections = {}
const unauthenticatedConn = {}
const assocConnAndUser = {}

const authenticateConnection = (connId, userId) => {
    if (unauthenticatedConn[connId]) {
        conections[userId] = unauthenticatedConn[connId];
        assocConnAndUser[connId] = userId;
        delete unauthenticatedConn[connId];
        return ({
            auth: true
        })
    } else if (conections[userId])
        return ({
            auth: false,
            isExisted: true
        })
    else return ({
        auth: false,
        isExisted: false
    })
}

const createWebSocketServer = () => {
    const wss = new WebSocketServer({
        port: 8000
    })

    wss.on("connection", connection => {
        let isWinkWink = false;
        const connID = uuidv4();

        unauthenticatedConn[connID] = connection;
        const response = {
            type: "auth",
            conn: connID
        }
        connection.send(JSON.stringify(response));

        connection.on("message", data => {
            const message = JSON.parse(data);

            switch (message.type) {
                case SocketAction.AUTH_SERVER: {
                    try {
                        const decoded = jwt.verify(message.token, process.env.AUTH_KEY);

                        if (unauthenticatedConn[decoded.conn]) {
                            delete unauthenticatedConn[decoded.conn];
                            isWinkWink = true;
                            console.log("WinkWink connection established")
                        }
                    } catch (error) {
                        if (error instanceof jwt.JsonWebTokenError) {
                            connection.close();
                            delete unauthenticatedConn[decoded.conn];
                            console.log(`Failed to authenticate server connection`)
                        }
                    }
                    break;
                }

                case SocketAction.CHAT: {
                    const { receiver, content } = message.payload;

                    const receiverConn = conections[receiver];
                    if (receiverConn)
                        receiverConn.send(JSON.stringify({
                            type: "chat",
                            payload: content
                        }));
                    break;
                }

                default:
                    console.error("Web Socket: Unknown message type")
            }
        })

        connection.on('close', () => {
            const userId = assocConnAndUser[connID];

            if (userId) {
                delete conections[userId];
                delete assocConnAndUser[connID];
            }
        });
    })
}

export {
    SocketAction,
    authenticateConnection
}

export default createWebSocketServer