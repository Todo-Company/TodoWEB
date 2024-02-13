import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const { username, email, password } = body.data;

    if(!username || !email || !password) {
        return NextResponse.json({ error: 'Missing username, email, or password'}, { status: 400 })

    }
    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(exist) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    return new NextResponse.json(user, { status: 200 });
}