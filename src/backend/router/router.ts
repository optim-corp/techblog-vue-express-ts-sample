import * as Express from "express"

import Environment from "../config/environment"

const env = new Environment()

class Router {
    public router: Express.Router;

    constructor() {
        this.router = Express.Router()
        this.api("/api")
    }

    private api(prefix: string): void {
        this.router.get(prefix + "/version", (req, res) => res.json({version: env.app_version}))
    }

}

export default Router
