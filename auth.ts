import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      await db.user.upsert({
        where: { email: user.email },
        update: { name: user.name, image: user.image },
        create: { email: user.email, name: user.name, image: user.image },
      });
      return true;
    },
    async jwt({ token }) {
      if (token.email && !token.uid) {
        const u = await db.user.findUnique({ where: { email: token.email } });
        token.uid = u?.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.uid;
      return session;
    },
  },
});
