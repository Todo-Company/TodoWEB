import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "John Smith" },
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password", placeholder: "Your password" }
            },
            async authorize(credentials) {
                if(!credentials.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

                if(!passwordsMatch) {
                    return null;
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        session: async (session, user) => {
            return Promise.resolve({
                ...session,
                user: {
                    ...user,
                }
            })
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }