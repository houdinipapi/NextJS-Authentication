import { NextAuth } from "@auth/nextjs";
import { options } from "./options";

const handler = NextAuth(options);
export { handler as GET, handler as <POST></POST> }