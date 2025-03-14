import { j } from "@/server/rpc/init";
import { HTTPException } from "hono/http-exception";
import { ErrorResponse } from "@/server/types/errors.types";
import { env } from "@/env.mjs"
import { authRoutes } from "../routers/auth";



const app = j.router().basePath("/api").use(j.defaults.cors).onError((error, c) => {
  if (error instanceof HTTPException) {
    const errorResponse = error.res ?? c.json<ErrorResponse>({
      isSuccess: false,
      Message: error.message
    }, error.status);
    return errorResponse;
  }
  return c.json<ErrorResponse>({
    isSuccess: false,
    Message: env.NODE_ENV === "production" ? "Internal Server Error" : (error.stack ?? error.message)
  }, 500);
})
const appRouter = j.mergeRouters(app, {
  Auth: authRoutes
})

export type AppRouter = typeof appRouter

export default appRouter
