import "dotenv/config";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

import router from "./routes/index.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.ES_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
		sameSite: "strict",
		maxAge: 1200000, 
	},
    store: new MySQLStore({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    })
}))
	

app.use((req, res, next) => {
    console.log("use",req.session)
    res.locals.user = req.session.user || null;
    res.locals.otpVerified = req.session.otpVerified || false;

    next();
});

app.use(router);

export default app;
