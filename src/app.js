import "dotenv/config";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import sessionConfig from "./config/session.js";

import router from "./routes/index.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.use((req, res, next) => {
    console.log("use",req.session)
    res.locals.user = req.session.user || null;
    res.locals.otpVerified = req.session.otpVerified || false;

    next();
});

app.use(router);

export default app;
