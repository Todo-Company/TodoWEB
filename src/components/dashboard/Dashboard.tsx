import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { TodoComponent, AddTodo } from "./todo";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SlideIn from "@/components/ui/slideIn";

export function Dashboard() {
    const [todos, setTodos] = useState([] as any[]);
    const { data, status }: { data: any; status: string } = useSession();
    const { toast } = useToast();

    useEffect(() => {
        if (status === "authenticated") {
            fetch(`/api/todo?userId=${data.user?.id}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setTodos(data);
                        console.log(data);
                    }
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: error.message,
                    });
                });
        }
    }, [data, status, toast]);

    type RequestBody = {
        isSubtodo: boolean;
        title: string;
        userId: string;
        type: string;
        goalDate: string;
        expectation: string;
        priority: string;
        parentId?: string;
        parentSubTodoId?: string;
    };

    const addTodoHandler = (values: any, isSubtodo: boolean, parentId?: string, parentSubTodoId?: string) => {
        const requestBody: RequestBody = {
            isSubtodo,
            title: values.title,
            userId: data?.user?.id,
            type: values.type,
            goalDate: values.goalDate,
            expectation: values.expectation,
            priority: values.priority,
        };

        if (isSubtodo) {
            requestBody.parentId = parentId;
            requestBody.parentSubTodoId = parentSubTodoId;
        }

        fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => {
                const updatedTodos = todos.map((todo) => {
                    if (todo.id === (isSubtodo ? parentId : undefined)) {
                        return { ...todo, subTodos: [...(todo.subTodos || []), data] };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message,
                });
            });
    };

    const updateCheckbox = (id: string, completed: boolean) => {
        fetch("/api/todo", {
            method: "PUT",
            body: JSON.stringify({ id, completed }),
        });
    };

    const deleteTodoHandler = (id: string, parentId?: string) => {
        fetch("/api/todo", {
            method: "DELETE",
            body: JSON.stringify({ id, parentId }),
        }).then(async (res) => {
            console.log(res);

            if (res.ok) {
                toast({
                    variant: "default",
                    title: "Success",
                    description: "Todo deleted successfully",
                });
            } else {
                let data = await res.json();
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.error,
                });
            }
        });
    };

    return (
        <div className="mx-auto mt-12 grid w-full max-w-[120ch] [grid-column:_content]">
            <SlideIn>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h2>
                <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                    Lets go and create some todos
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="mt-4">
                            Add Todo
                        </Button>
                    </DialogTrigger>
                    <AddTodo addTodoHandler={addTodoHandler} isSubtodo={false} />
                </Dialog>
            </SlideIn>

            <div className="mt-8 grid">
                {/* level 0 divide */}
                {todos.map((todo: any, index) => (
                    <TodoComponent
                        key={index}
                        todo={todo}
                        addTodoHandler={addTodoHandler}
                        updateCheckbox={updateCheckbox}
                        deleteTodoHandler={deleteTodoHandler}
                    />
                ))}
            </div>
        </div>
    );
}
