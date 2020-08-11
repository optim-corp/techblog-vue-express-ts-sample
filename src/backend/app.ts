import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as lusca from "lusca";
import path from "path";

import Router from "./router/router"

import Environment from "./config/environment"

const env = new Environment()

class App {
    public app: express.Application;

    constructor() {

        this.app = express.default();
        this.config();
        // this.passport();
        this.router();
    }

    private config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(compression.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(session.default({
            resave: true,
            saveUninitialized: true,
            secret: env.app_session_secret
        }));
        this.app.use(lusca.xframe("SAMEORIGIN"));
        this.app.use(lusca.xssProtection(true));
        console.log(path.join(__dirname, "public"))
        this.app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000}));
    }

    private router(): void {
        const route = new Router()
        this.app.use("/", route.router)
    }
}

export default new App().app;
