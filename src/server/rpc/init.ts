import { jstack } from "jstack";
import { Session, User } from "lucia";
import { HTTPException } from "hono/http-exception";
import { LuciaInit } from "../lucia/lucia";
import { Env } from "hono";

export interface JEnv extends Env {
  Variables: {
    user: User | null,
    session: Session | null
  }
}

export const j = jstack.init<JEnv>();

export const createNewRoute = j.router


const GlobalMiddleware = j.middleware(async ({ next, c }) => {
  const sessionId = LuciaInit.readSessionCookie(c.req.header("Cookie") ?? "");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    await next();
  }
  const { user, session } = await LuciaInit.validateSession(sessionId as string);
  if (session && session.fresh) {
    const cookie = LuciaInit.createSessionCookie(session.id).serialize();
    c.header("Set-Cookie", cookie, { append: true });
  }
  if (!session) {
    const blankCookie = LuciaInit.createBlankSessionCookie().serialize();
    c.header("Set-Cookie", blankCookie, { append: true });
  }
  c.set("session", session);
  c.set("user", user);
  await next();
})

export const publicProcedure = j.procedure.use(GlobalMiddleware)

export const protectedProcedure = j.procedure.use(GlobalMiddleware).use(async ({ c, next }) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, {
      message: "Unauthrized"
    })
  }
  await next();
})



