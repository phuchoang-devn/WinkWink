import express from "express";

import apiRouter from "./api/routers/apiRouter.js";
import {
	respondNoResourceFound,
	respondInternalError
} from "./api/controllers/errorController.js"

const app = express();

app.set("port", process.env.PORT || 3000);

/*
const auth = (req, res, next) => {
	if(req.query.singnedin === 'true'){
		next()
	}
	res.send('please login')
}
app.use(auth);
*/

// URL-encoded and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.DEV) {
	const path = "./client/build/";
	app.use(express.static(path));
}

app.use('/api', apiRouter);

// error handlers
app.use(respondNoResourceFound);
app.use(respondInternalError);

app.listen(app.get("port"), () => {
	console.log(
		`Server running at http://localhost:${app.get("port")}`
	);
});