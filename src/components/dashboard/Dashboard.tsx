import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { TodoEnum } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { TodoComponent, AddTodo } from "./todo";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

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

    const addTodo = () => {
        fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({
                isSubtodo: false,
                title: "New Todo",
                userId: data?.user?.id,
                type: TodoEnum.SECTION,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos([...todos, data]);
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message,
                });
            });
    };

    const addSubTodo = (props: { parentId?: string; parentSubTodoId?: string }) => () => {
        fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({
                isSubtodo: true,
                title: "New Sub Todo",
                userId: data?.user?.id,
                parentId: props.parentId,
                parentSubTodoId: props.parentSubTodoId,
                type: TodoEnum.SECTION,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const updatedTodos = todos.map((todo) => {
                    if (todo.id === props.parentId) {
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

    return (
        <div className="mx-auto mt-12 grid max-w-[100ch] [grid-column:_content] ">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h2>
            <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">Lets go and create some todos</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">
                        Add Todo
                    </Button>
                </DialogTrigger>
                <AddTodo addSubTodo={addSubTodo} />
            </Dialog>

            <div className="mt-8 grid">
                {/* level 0 divide */}
                {todos.map((todo: any, index) => (
                    <TodoComponent key={index} todo={todo} addSubTodo={addSubTodo} />
                ))}
            </div>
        </div>
    );
}
