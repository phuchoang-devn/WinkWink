import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import apiRouter from "./api/routers/apiRouter.js";
import errorController from "./api/controllers/errorController.js"
import dbConnect from "./api/models/index.js";
import createWebSocketServer from "./api/web_socket/wsServer.js";
import createWebSocketClient from "./api/web_socket/wsClient.js";
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
dbConnect();

createWebSocketServer();
createWebSocketClient();

app.set("port", process.env.PORT || 3000);

app.use(cors(/*
	The default configuration
	{
  		"origin": "*",
		"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  		"preflightContinue": false,
  		"optionsSuccessStatus": 204
}
*/))

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

app.use('/api', apiRouter);

if (!process.env.DEV) {
	const staticPath = "./client/build/";
	app.use(express.static(staticPath));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
	console.log(
		`Server running at http://localhost:${app.get("port")}`
	);
});