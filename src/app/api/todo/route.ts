import { NextApiRequest } from "next";
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
    type: TodoEnum,
    parentId?: string,
    parentSubTodoId?: string,
) {
    if (parentId) {
        if (parentSubTodoId) {
            return await prisma.subTodo.create({
                data: {
                    completed: false,
                    created: new Date(),
                    goalDate: new Date(),
                    title,
                    type,
                    priority: PriorityEnum.HIGH,
                    expectation: {
                        startTime: new Date(),
                        endTime: new Date(),
                    },
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
                    goalDate: new Date(),
                    title,
                    type,
                    priority: PriorityEnum.HIGH,
                    expectation: {
                        startTime: new Date(),
                        endTime: new Date(),
                    },
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

async function createTodoHandler(req: any) {
    try {
        const body = await req.json();
        const {
            title,
            userId,
            type,
            isSubtodo,
        }: { title: string; userId: string; type: "SECTION" | "SIMPLE" | "SEQUENTIAL"; isSubtodo: boolean } = body;
        let data;

        if (isSubtodo) {
            switch (type) {
                case TodoEnum.SIMPLE:
                    data = await createSubTodo(title, userId, type, body.parentId, body.parentSubTodoId);
                    break;
                case TodoEnum.SEQUENTIAL:
                    data = await createSubTodo(title, userId, type, body.parentId, body.parentSubTodoId);
                    break;
                case TodoEnum.SECTION:
                    data = await createSubTodo(title, userId, type, body.parentId, body.parentSubTodoId);
                    break;
                default:
                    data = { error: "Invalid type" };
                    break;
            }
        } else {
            switch (type) {
                case TodoEnum.SIMPLE:
                    data = await createTodo(title, userId, type, body.goalDate, body.expectation, body.priority);
                    break;
                case TodoEnum.SEQUENTIAL:
                    data = await createTodo(title, userId, type, body.goalDate, body.expectation, body.priority);
                    break;
                case TodoEnum.SECTION:
                    data = await createTodo(title, userId, type, body.goalDate, body.expectation, body.priority);
                    break;
                default:
                    data = { error: "Invalid type" };
                    break;
            }
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
        let todos: Todo[] = await prisma.todo.findMany({
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
