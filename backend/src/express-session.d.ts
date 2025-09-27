import 'express-session'

declare module 'express-session' {
    interface SessionData {
        userId?: string;
        is2faPassed?: boolean;
    }
}