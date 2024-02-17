import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
                password: { label: "Password", type: "password", placeholder: "Your password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(credentials.password, user.password ?? "");

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (err) {
                    console.error(err);
                    return null;
                } finally {
                    await prisma.$disconnect();
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        jwt: async ({ token, user, session, trigger }: { token: any; user: any; session: any; trigger: any }) => {
            try {
                if (trigger === "update" && session.name) {
                    token.name = session.name;
                }

                if (user) {
                    return {
                        ...token,
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                }

                await prisma.user.update({
                    where: {
                        id: token.id,
                    },
                    data: {
                        name: token.name,
                    },
                });

                return token;
            } catch (err) {
                console.error(err);
                return token;
            } finally {
                await prisma.$disconnect();
            }
        },
        session: async ({ session, user, token }: { session: any; user: any; token: any }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                },
            };
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
