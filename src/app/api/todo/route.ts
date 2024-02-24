import { NextApiRequest, NextApiResponse } from "next";
import { PriorityEnum, PrismaClient, Todo, TodoEnum } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function createTodo(
    title: string,
    userId: string,
    type: "SECTION" | "SIMPLE" | "SEQUENTIAL",
    goalDate: string,
    expectation: number,
    priority: "HIGH" | "MEDIUM" | "LOW",
) {
    return await prisma.todo.create({
        data: {
            completed: false,
            created: new Date(),
            goalDate: new Date(goalDate),
            priority: PriorityEnum[priority],
            expectation,
            title,
            type: TodoEnum[type],
            userId,
        },
    });
}

async function createSubTodo(
    title: string,
    userId: string,
    type: "SECTION" | "SIMPLE" | "SEQUENTIAL",
    goalDate: string,
    expectation: number,
    priority: "HIGH" | "MEDIUM" | "LOW",
    parentId?: string,
    parentSubTodoId?: string | undefined,
) {
    if (parentId) {
        if (parentSubTodoId) {
            return await prisma.subTodo.create({
                data: {
                    completed: false,
                    created: new Date(),
                    goalDate: new Date(goalDate),
                    priority: PriorityEnum[priority],
                    expectation,
                    title,
                    type: TodoEnum[type],
                    userId,
                    todoId: parentId,
                    parentSubTodoId,
                },
                include: {
                    subTodos: true,
                },
            });
        } else {
            return await prisma.subTodo.create({
                data: {
                    completed: false,
                    created: new Date(),
                    goalDate: new Date(goalDate),
                    priority: PriorityEnum[priority],
                    expectation,
                    title,
                    type: TodoEnum[type],
                    userId,
                    todoId: parentId,
                },
                include: {
                    subTodos: true,
                },
            });
        }
    } else {
        throw new Error("Parent ID must be provided to create a subtodo.");
    }
}

/**
 * Handler function to create a todo.
 * @param {Request} req - The request object.
 * @returns {Promise<NextResponse>} The response containing the created todo.
 */
async function createTodoHandler(req: Request): Promise<NextResponse> {
    try {
        const body: {
            title: string;
            userId: string;
            type: "SECTION" | "SIMPLE" | "SEQUENTIAL";
            isSubtodo: boolean;
            goalDate: string;
            priority: "LOW" | "MEDIUM" | "HIGH";
            expectation: number;
            parentId?: string;
            parentSubTodoId?: string;
        } = await req.json();

        let data: Todo;

        if (body.isSubtodo) {
            data = await createSubTodo(
                body.title,
                body.userId,
                body.type,
                body.goalDate,
                body.expectation,
                body.priority,
                body.parentId,
                body.parentSubTodoId,
            );
        } else {
            data = await createTodo(body.title, body.userId, body.type, body.goalDate, body.expectation, body.priority);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

async function getTodosHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { searchParams } = new URL(req.url as string);
        const userId = searchParams.get("userId");
        let todos = await prisma.todo.findMany({
            where: {
                userId: String(userId),
            },
            include: {
                subTodos: {
                    include: {
                        subTodos: {
                            include: {
                                subTodos: {
                                    include: {
                                        subTodos: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (todos) {
            todos.forEach((todo) => {
                if (todo.subTodos) {
                    todo.subTodos = todo.subTodos.filter((subTodo) => subTodo.parentSubTodoId === null);
                }
            });
        }

        return NextResponse.json(todos, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export { createTodoHandler as POST, getTodosHandler as GET };
