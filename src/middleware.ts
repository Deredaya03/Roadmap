import { getSession } from "auth-astro/server";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith("/me")) {
    const session = await getSession(context.request);

    if (!session) {
      return context.redirect("/login");
    }
  }

  if (pathname === "/login") {
    const session = await getSession(context.request);
    if (session) {
      return context.redirect("/");
    }
  }

  return next();
});