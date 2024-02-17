import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { TodoEnum } from "@prisma/client";

export function Dashboard() {
    const [todos, setTodos] = useState([] as any[]);
    const { data, status }: { data: any; status: string } = useSession();
    const { toast } = useToast();

    const RecursiveSubTodosComponent = ({ subTodos, addSubTodo }) => {
        return (
            <div>
                {subTodos.map((subTodo) => (
                    <div key={subTodo.id}>
                        <h2>Sub Todo</h2>
                        <label>
                            <input type="checkbox" checked={subTodo.completed} />
                            {subTodo.title}
                            <button onClick={() => addSubTodo({ parentId: todo.id, parentSubTodoId: subTodo.id })}>
                                Add Sub Todo
                            </button>
                        </label>
                        {subTodo.subTodos && subTodo.subTodos.length > 0 && (
                            <RecursiveSubTodosComponent subTodos={subTodo.subTodos} addSubTodo={addSubTodo} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

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
        <>
            <h1>Dashboard</h1>
            <button onClick={addTodo}>Add Todo</button>
            <div>
                {todos.map((todo: any) => (
                    <div key={todo.id}>
                        <h1>Todo</h1>
                        <label>
                            <input type="checkbox" checked={todo.completed} />
                            {todo.title}
                            <button onClick={addSubTodo({ parentId: todo.id })}>Add Sub Todo</button>
                        </label>
                        <div>
                            {todo.subTodos && (
                                <RecursiveSubTodosComponent subTodos={todo.subTodos} addSubTodo={addSubTodo} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
