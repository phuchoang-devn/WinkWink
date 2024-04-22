import express from "express";
import layouts from "express-ejs-layouts";

import apiRouter from "./routers/apiRouter";
import pageRouter from "./routers/pageRouter";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// TODO: middleware - layout module
app.use(layouts);

// TODO: middleware - URL-encoded and JSON

app.use('/api', apiRouter);
app.use('', pageRouter);

// TODO: middleware - error handlers

app.listen(app.get("port"), () => {
	console.log(
		`Server running at http://localhost:${app.get("port")}`
	);
});