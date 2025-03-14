import { FormData } from "@/components/types/zod-from";
import { db } from "@/db/db";
import { userTable } from "@/db/models/user.m";
import { createNewRoute, protectedProcedure, publicProcedure } from "@/server/rpc/init";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import argon2 from "argon2";
import { SuccessResponse, UserInfo } from "@/server/types/success.types";
import { LuciaInit } from "@/server/lucia/lucia";


export const authRoutes = createNewRoute({
  SignUp: publicProcedure.input(FormData).mutation(async ({ c, input }) => {
    const zodValidation = FormData.safeParse(input);
    if (!zodValidation.success) {
      throw new HTTPException(408, {
        message: "Invalid form data"
      })
    }
    const { data } = zodValidation;
    const [isUserExist] = await db.select().from(userTable).where(eq(userTable.username, data.username)).limit(1);
    if (isUserExist) {
      throw new HTTPException(403, {
        message: "Username is already taken"
      })
    }
    const HashedPassword = await argon2.hash(data.password);
    if (!HashedPassword) {
      throw new HTTPException(500, {
        message: "Internal Server Error"
      })
    }
    const insterUser = await db.insert(userTable).values({
      username: data.username,
      password: HashedPassword
    }).returning({ id: userTable.id, username: userTable.username });

    if (insterUser) {
      return c.json<SuccessResponse>({
        isSuccess: true,
        Message: "User created successfully"
      }, 201)
    }
    throw new HTTPException(500, {
      message: "Failed to create user"
    })
  }),
  SignIn: publicProcedure.input(FormData).mutation(async ({ c, input }) => {
    const zodValidation = FormData.safeParse(input);
    if (!zodValidation.success) {
      throw new HTTPException(408, {
        message: "Invalid form data."
      })
    }
    const { data } = zodValidation;
    const [isUserExist] = await db.select().from(userTable).where(eq(userTable.username, data.username)).limit(1);
    if (!isUserExist) {
      throw new HTTPException(403, {
        message: "Invalid Username or Password."
      })
    }
    const VerifyPassword = await argon2.verify(isUserExist.password, data.password);
    if (!VerifyPassword) {
      throw new HTTPException(500, {
        message: "Invalid Username or Password."
      })
    }
    const session = await LuciaInit.createSession(isUserExist.id, {});
    const cookie = LuciaInit.createSessionCookie(session.id);
    c.header("Set-Cookie", cookie.serialize(), { append: true });
    return c.json<SuccessResponse>({
      isSuccess: true,
      Message: "Login successfully."
    })
  }),
  SignOut: protectedProcedure.mutation(async ({ c }) => {
    const session = c.get("session");
    if (!session) {
      throw new HTTPException(401, {
        message: "Unauthrized"
      })
    }
    await LuciaInit.invalidateSession(session.id);
    const blankCookie = LuciaInit.createBlankSessionCookie().serialize()
    c.header("Set-Cookie", blankCookie, { append: true });
    return c.json<SuccessResponse>({
      isSuccess: true,
      Message: "Logout successfully"
    })
  }),
  getUserInfo: protectedProcedure.query(async ({ c }) => {
    const user = c.get("user");
    return c.json<UserInfo>({
      isSuccess: true,
      data: {
        id: user?.id as string,
        username: "Not"
      }
    })
  })
})














