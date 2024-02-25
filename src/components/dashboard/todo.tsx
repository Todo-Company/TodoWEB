"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import AddTodoDialog from "./AddTodoDialog";
import { useState } from "react";

export function TodoComponent({
    todo,
    addTodoHandler,
    updateCheckbox,
}: {
    todo: any;
    addTodoHandler: (values: any, isSubtodo: boolean, parentId?: string, parentSubTodoId?: string) => void;
    updateCheckbox: (id: string, completed: boolean) => void;
}) {
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    let parentId = todo.todoId;
    let subTodoId = todo.id;
    if (parentId === undefined || parentId === null) {
        parentId = todo.id;
        subTodoId = null;
    } else {
        parentId = todo.todoId;
    }

    return (
        <div
            key={todo.id}
            className={`grid gap-4 pb-4 ${todo.subTodos && "mx-4"} ${isCompleted ? "border-todoFinished-foreground" : "border-border"} ${todo.type === "SECTION" && "border-[1px]"} `}
        >
            <div
                className={`${todo.type === "SECTION" && "bg-todo"} group grid gap-4 border-b ${isCompleted && "bg-todoFinished text-todoFinished-foreground"} px-4 py-6`}
            >
                <Label className="flex items-center justify-between gap-4">
                    <Checkbox
                        className="transition-colors hover:bg-muted data-[state=checked]:border-todoFinished-foreground data-[state=checked]:bg-todoFinished-foreground"
                        defaultChecked={isCompleted}
                        onCheckedChange={() => {
                            updateCheckbox(todo.id, !isCompleted);
                            setIsCompleted(!isCompleted);
                        }}
                    />
                    <h3 className={`w-full scroll-m-20 text-lg leading-7 ${!isCompleted && "text-foreground"}`}>
                        {todo.title}
                    </h3>
                </Label>
                <div
                    className={`flex gap-6 [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:font-medium ${isCompleted ? "text-todoFinished-foreground" : "text-todo-foreground"}`}
                >
                    <span>
                        {getPriorityIcon(todo.priority, isCompleted)}
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
                        {new Date(todo.created).toLocaleDateString()}
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
                        {new Date(todo.goalDate).toLocaleDateString()}
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
                        {todo.expectation} minutes
                    </span>
                </div>
                <AddTodoDialog
                    addTodoHandler={addTodoHandler}
                    isSubtodo={true}
                    type={todo.type}
                    parentId={parentId}
                    parentSubTodoId={subTodoId}
                />
            </div>

            {todo.subTodos && todo.subTodos.length > 0 && (
                <div className={`${todo.type === "SECTION" && "m-2 border-[1px] empty:border-0"}`}>
                    {todo.subTodos.map((subTodo: any) => (
                        <TodoComponent
                            key={subTodo.id}
                            todo={subTodo}
                            addTodoHandler={addTodoHandler}
                            updateCheckbox={updateCheckbox}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function AddTodo({
    addTodoHandler,
    isSubtodo,
    parentId,
    parentSubTodoId,
}: {
    addTodoHandler: (values: any, isSubtodo: boolean, parentId?: string, parentSubTodoId?: string) => void;
    isSubtodo: boolean;
    parentId?: string;
    parentSubTodoId?: string;
}) {
    const formSchema = z.object({
        title: z.string().min(1, "Title must be provided"),
        priority: z.string().min(1, "Select priority"),
        type: z.string().min(1, "Select type"),
        goalDate: z.date({
            required_error: "Goal date is required",
        }),
        expectation: z.coerce.number().int().gt(0, "Expectation must be greater than 0"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            priority: "",
            type: "",
            goalDate: new Date(),
            expectation: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        addTodoHandler(values, isSubtodo, parentId, parentSubTodoId);
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
                    <FormField
                        control={form.control}
                        name="goalDate"
                        render={({ field }) => (
                            <FormItem className="mt-4 flex w-full flex-col">
                                <FormLabel>Goal Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    " pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expectation"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Expectation</FormLabel>
                                <FormControl>
                                    <Input type="number" onChange={field.onChange} value={field.value} />
                                </FormControl>
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
