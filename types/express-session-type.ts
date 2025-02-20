import User from "@app/models/user";

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}