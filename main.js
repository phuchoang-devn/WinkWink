import express from "express";
import layouts from "express-ejs-layouts";

import apiRouter from "./routers/apiRouter";
import pageRouter from "./routers/pageRouter";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

const middleware = (req, res, next) =>{
	console.log("middleware")
	next()
	return
}
app.use(middleware)

const auth = (req, res, next) => {
	if(req.query.singnedin === 'true'){
		next()
	}
	res.send('please login')
}

app.use(auth);

// TODO: middleware - layout module
app.use(layouts);

// TODO: middleware - URL-encoded and JSON

app.use('/api', apiRouter);
app.use('', pageRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: middleware - error handlers
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
	console.log(
		`Server running at http://localhost:${app.get("port")}`
	);
});