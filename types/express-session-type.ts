import { IUserVM } from "@app/models/user";
import { WithId } from "mongodb";

declare module "express-session" {
  export interface SessionData {
    user: WithId<IUserVM>;
  }
}
