import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import client from "@/lib/db";

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(client),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Add user id to session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
