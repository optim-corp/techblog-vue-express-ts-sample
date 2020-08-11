import * as dotenv from 'dotenv'

class Environment {
    public app_name: string
    public app_debug: boolean
    public app_version: string
    public app_session_secret: string

    constructor() {
        dotenv.config()
        this.app_name = Environment.setString("APP_NAME", "sample app")
        this.app_debug = Environment.setBoolean("APP_DEBUG", true)
        this.app_version = Environment.setString("APP_VERSION", "No Version")
        // セッション暗号化時に利用するキーの為、変更必須
        this.app_session_secret = Environment.setString("APP_SESSION_SECRET", "hogepiyo")
    }

    private static setString(name: string, default_env: string): string {
        if (process.env[name] === undefined) return default_env
        return process.env[name]
    }

    private static setBoolean(name: string, default_env: boolean): boolean {
        if (process.env[name] === undefined) return default_env
        return process.env[name] === "true"
    }

    private static setRequire(name: string): string | Error {
        if (process.env[name] === undefined) {
            throw new Error("Environment Set Error : " + name)
        }
        return process.env[name]
    }
}

export default Environment
