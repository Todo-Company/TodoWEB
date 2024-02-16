import { NextApiRequest } from "next";
import { PriorityEnum, PrismaClient, Todo, TodoEnum } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function createSimpleTodo(title: string, userId: string) {
    return await prisma.todo.create({
        data: {
            completed: false,
            created: new Date(),
            goalDate: new Date(),
            priority: PriorityEnum.HIGH,
            expectation: {
                startTime: new Date(),
                endTime: new Date(),
            },
            title: title,
            type: TodoEnum.SIMPLE,
            userId: userId,
        },
    });
}

async function createSequentialTodo(title: string, userId: string) {
    return await prisma.todo.create({
        data: {
            completed: false,
            created: new Date(),
            goalDate: new Date(),
            priority: PriorityEnum.HIGH,
            expectation: {
                startTime: new Date(),
                endTime: new Date(),
            },
            title: title,
            type: TodoEnum.SEQUENTIAL,
            userId: userId,
            subTodos: [],
        },
    });
}

async function createSectionTodo(title: string, userId: string) {
    return await prisma.todo.create({
        data: {
            completed: false,
            created: new Date(),
            goalDate: new Date(),
            priority: PriorityEnum.HIGH,
            expectation: {
                startTime: new Date(),
                endTime: new Date(),
            },
            title: title,
            type: TodoEnum.SECTION,
            userId: userId,
            subTodos: [],
        },
    });
}

async function createTodoHandler(req: any) {
    try {
        const body = await req.json();
        const { type } = body;
        let data;

        switch (type) {
            case TodoEnum.SIMPLE:
                data = await createSimpleTodo(body.title, body.userId);
                break;
            case TodoEnum.SEQUENTIAL:
                data = await createSequentialTodo(body.title, body.userId);
                break;
            case TodoEnum.SECTION:
                data = await createSectionTodo(body.title, body.userId);
                break;
            default:
                data = { error: "Invalid type" };
                break;
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

async function getTodosHandler(req: NextApiRequest) {
    try {
        const { searchParams } = new URL(req.url as string);
        const userId = searchParams.get("userId");
        const todos: Todo[] = await prisma.todo.findMany({
            where: {
                userId: String(userId),
            },
        });
        return NextResponse.json(todos, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export { createTodoHandler as POST, getTodosHandler as GET };
