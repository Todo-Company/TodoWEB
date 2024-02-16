import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { TodoEnum } from "@prisma/client";

export function Dashboard() {
    const [todos, setTodos] = useState([] as any[]);
    const { data, status }: { data: any; status: string } = useSession();
    const { toast } = useToast();

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         fetch(`/api/todo?userId=${data.user?.id}`, {
    //             method: "GET",
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 if (data) {
    //                     setTodos(data);
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast({
    //                     variant: "destructive",
    //                     title: "Error",
    //                     description: error.message,
    //                 });
    //             });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data, status]);

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

    // const addSubTodo = (parentId: string) => () => {
    //     fetch("/api/todo", {
    //         method: "POST",
    //         body: JSON.stringify({ isSubtodo: true, title: "New Sub Todo", userId: data?.user?.id, parentId }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setTodos([...todos, data]);
    //         })
    //         .catch((error) => {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Error",
    //                 description: error.message,
    //             });
    //         });
    // };

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {/* {todos.map((todo: any) => (
                    <label key={todo.id}>
                        <input type="checkbox" checked={todo.completed} />
                        {todo.title}
                        <button onClick={addSubTodo(todo.id)}>Add Todo</button>
                    </label>
                ))} */}
            </ul>
        </>
    );
}
