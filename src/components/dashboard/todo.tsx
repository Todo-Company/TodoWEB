"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function TodoComponent({ todo, addSubTodo }: any) {
    {
        /* TODO fix types */
    }
    return (
        <div
            key={todo.id}
            className={`grid gap-4 pb-4 ${todo.subTodos && "mx-4"} ${todo.completed ? "border-todoFinished-foreground" : "border-border"} ${todo.type === "SECTION" && "border-[1px]"} `}
        >
            <div
                className={`${todo.type === "SECTION" && "bg-todo"} group grid gap-4 border-b ${todo.completed && "bg-todoFinished text-todoFinished-foreground"} px-4 py-6`}
            >
                <Label className="flex items-center justify-between gap-4">
                    <Checkbox
                        className="data-[state=checked]:bg-todoFinished-foreground data-[state=checked]:border-todoFinished-foreground transition-colors hover:bg-muted"
                        defaultChecked={todo.completed}
                    />
                    <h3 className={`w-full scroll-m-20 text-lg leading-7 ${!todo.completed && "text-foreground"}`}>
                        {todo.title}
                    </h3>
                </Label>

                <div
                    className={`flex gap-6 [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:font-medium ${todo.completed ? "text-todoFinished-foreground" : "text-todo-foreground"}`}
                >
                    <span>
                        {getPriorityIcon(todo.priority, todo.completed)}
                        {todo.priority}
                    </span>
                    <span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                            <path
                                d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76M12 8v8m-4-4h8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-current stroke-2"
                            />
                        </svg>
                        {todo.created}
                    </span>
                    <span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                            <path
                                d="m12 8 6-3-6-3v10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-current stroke-2"
                            />
                            <path
                                d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12m-9.51.85 11.02 6.3m0-6.3L6.5 19.15"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-current stroke-2"
                            />
                        </svg>
                        {todo.goalDate}
                    </span>
                    <span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                            <path
                                d="M10 2h4m-2 12 3-3m-3 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-current stroke-2"
                            />
                        </svg>
                        30 minutes{/* TODO */}
                    </span>
                </div>

                <div
                    className={`flex max-h-0 gap-2 overflow-clip transition-all group-hover:max-h-10 [&>*]:flex-1 ${todo.type === "SIMPLE" && "hidden"}`}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="text-todo-foreground flex gap-2 decoration-current transition-colors hover:text-foreground"
                                variant="link"
                            >
                                <Separator />
                                Add Todo
                                <Separator />
                            </Button>
                        </DialogTrigger>
                        <AddTodo addSubTodo={addSubTodo} />
                    </Dialog>
                </div>
            </div>

            {todo.subTodos && <RecursiveSubTodosComponent subTodos={todo.subTodos} addSubTodo={addSubTodo} />}
        </div>
    );
}

const RecursiveSubTodosComponent = ({ subTodos, addSubTodo }: any) => {
    {
        /* TODO fix types */
    }
    return (
        <>
            {subTodos.map((subTodo) => (
                <div
                    key={subTodo.id}
                    className={`mx-4 grid gap-2 ${subTodo.completed ? "border-todoFinished-foreground" : "border-border"} ${subTodo.type === "SECTION" && "border-[1px]"} `}
                >
                    {/* level 2+ divide */}
                    <div
                        className={`${subTodo.type === "SECTION" && "bg-todo"} group grid gap-4 border-b ${subTodo.completed && "bg-todoFinished text-todoFinished-foreground"} p-4`}
                    >
                        <Label className="flex items-center justify-between gap-4">
                            <Checkbox
                                className="data-[state=checked]:bg-todoFinished-foreground data-[state=checked]:border-todoFinished-foreground transition-colors hover:bg-muted"
                                defaultChecked={subTodo.completed}
                            />
                            <h3
                                className={`w-full scroll-m-20 text-lg leading-7 ${!subTodo.completed && "text-foreground"}`}
                            >
                                {subTodo.title}
                            </h3>
                        </Label>

                        <div
                            className={`flex gap-6 [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:font-medium ${subTodo.completed ? "text-todoFinished-foreground" : "text-todo-foreground"}`}
                        >
                            <span>
                                {getPriorityIcon(subTodo.priority, subTodo.completed)}
                                {subTodo.priority}
                            </span>
                            <span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                >
                                    <path
                                        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76M12 8v8m-4-4h8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="stroke-current stroke-2"
                                    />
                                </svg>
                                {subTodo.created}
                            </span>
                            <span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                >
                                    <path
                                        d="m12 8 6-3-6-3v10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="stroke-current stroke-2"
                                    />
                                    <path
                                        d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12m-9.51.85 11.02 6.3m0-6.3L6.5 19.15"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="stroke-current stroke-2"
                                    />
                                </svg>
                                {subTodo.goalDate}
                            </span>
                            <span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                >
                                    <path
                                        d="M10 2h4m-2 12 3-3m-3 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="stroke-current stroke-2"
                                    />
                                </svg>
                                30 minutes{/* TODO */}
                            </span>
                        </div>

                        <div className="grid max-h-0 overflow-clip transition-all group-hover:max-h-10">
                            <Button
                                variant={"outline"}
                                onClick={() => addSubTodo({ parentId: todo.id, parentSubTodoId: subTodo.id })}
                            >
                                Add Sub Todo
                            </Button>
                        </div>
                    </div>

                    {subTodo.subTodos && subTodo.subTodos.length > 0 && (
                        <div className={`${subTodo.type === "SECTION" && "m-2 border-[1px] empty:border-0"}`}>
                            <RecursiveSubTodosComponent subTodos={subTodo.subTodos} addSubTodo={addSubTodo} />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export function AddTodo(addSubTodo: any) {
    {
        /* TODO add types */
    }

    const formSchema = z.object({
        title: z.string().min(1, "Title must be provided"),
        priority: z.string().min(1, "Select priority"),
        type: z.string().min(1, "Select type"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            priority: "",
            type: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new TO DO</DialogTitle>
                <DialogDescription>
                    If you are not sure what you are filling out, make sure to check our tutorial in the command
                    section.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl className="!mt-0">
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Type</FormLabel>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="!mt-0">
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="SIMPLE">Simple</SelectItem>
                                            <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
                                            <SelectItem value="SECTION">Section</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Priority</FormLabel>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="!mt-0">
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="LOW">
                                                <span className="flex items-center gap-2">
                                                    {getPriorityIcon("LOW", false)}
                                                    <span>Low</span>
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="MEDIUM">
                                                <span className="flex items-center gap-2">
                                                    {getPriorityIcon("MEDIUM", false)}
                                                    <span>Medium</span>
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="HIGH">
                                                <span className="flex items-center gap-2">
                                                    {getPriorityIcon("HIGH", false)}
                                                    <span>High</span>
                                                </span>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="mt-6" type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </DialogContent>
    );
}

function getPriorityIcon(priority: string, completed: boolean) {
    switch (priority) {
        case "LOW":
            return (
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.473 10.158a1.75 1.75 0 0 0-1.452 0L2.522 13.57a.875.875 0 0 0 0 1.602l7.508 3.42a1.75 1.75 0 0 0 1.452 0l7.508-3.412a.875.875 0 0 0 0-1.6z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`stroke-2 ${completed ? "stroke-todoFinished-foreground" : "stroke-priority-low"}`}
                    />
                </svg>
            );
        case "MEDIUM":
            return (
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.473 6.158a1.75 1.75 0 0 0-1.452 0L2.522 9.57a.875.875 0 0 0 0 1.602l7.508 3.42a1.75 1.75 0 0 0 1.452 0l7.508-3.412a.875.875 0 0 0 0-1.6z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`stroke-2 ${completed ? "stroke-todoFinished-foreground" : "stroke-priority-medium"}`}
                    />
                    <path
                        d="m5.32 12.688-3.063 1.4a.875.875 0 0 0 0 1.583l7.525 3.422a1.75 1.75 0 0 0 1.444 0l7.508-3.413a.876.876 0 0 0 0-1.601l-3.063-1.392"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`stroke-2 ${completed ? "stroke-todoFinished-foreground" : "stroke-priority-medium"}`}
                    />
                </svg>
            );
        default:
            return (
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g
                        clip-path="url(#a)"
                        stroke="#D9232F"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`stroke-2 ${completed ? "stroke-todoFinished-foreground" : "stroke-priority-high"}`}
                    >
                        <path d="M11.226 1.907a1.75 1.75 0 0 0-1.452 0l-7.5 3.413a.875.875 0 0 0 0 1.601l7.508 3.421a1.75 1.75 0 0 0 1.453 0l7.507-3.412a.875.875 0 0 0 0-1.601z" />
                        <path d="m5.32 8.313-3.063 1.4a.875.875 0 0 0 0 1.583l7.525 3.422a1.75 1.75 0 0 0 1.444 0l7.508-3.413a.876.876 0 0 0 0-1.601L15.67 8.312" />
                        <path d="m5.32 12.688-3.063 1.4a.875.875 0 0 0 0 1.583l7.525 3.422a1.75 1.75 0 0 0 1.444 0l7.508-3.413a.876.876 0 0 0 0-1.601l-3.063-1.392" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="#fff" d="M0 0h21v21H0z" />
                        </clipPath>
                    </defs>
                </svg>
            );
    }
}
