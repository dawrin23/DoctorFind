import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!userFound) {
          const userFoundDoctor = await prisma.userDoctor.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!userFoundDoctor) {
            throw new Error("Invalid crendentials");
          } else {
            const passwordMatchDoctor = await bcrypt.compare(
              credentials!.password,
              userFoundDoctor.password
            );
            if (!passwordMatchDoctor) {
              throw new Error("Invalid crendentials");
            }
            return userFoundDoctor;
          }
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid crendentials");
        }

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
