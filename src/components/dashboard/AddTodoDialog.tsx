import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddTodo } from "./todo";

export default function AddTodoDialog({
    addTodoHandler,
    isSubtodo,
    type,
    parentId,
    parentSubTodoId,
}: {
    addTodoHandler: (values: any, isSubtodo: boolean, parentId?: string, parentSubTodoId?: string) => void;
    isSubtodo: boolean;
    type: "SIMPLE" | "SECTION" | "SEQUENTIAL";
    parentId?: string;
    parentSubTodoId?: string;
}) {
    return (
        <div
            className={`flex max-h-0 gap-2 overflow-clip transition-all group-hover:max-h-10 [&>*]:flex-1 ${type === "SIMPLE" && "hidden"}`}
        >
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="flex gap-2 text-todo-foreground decoration-current transition-colors hover:text-foreground"
                        variant="link"
                    >
                        <Separator />
                        Add Todo
                        <Separator />
                    </Button>
                </DialogTrigger>
                <AddTodo
                    addTodoHandler={addTodoHandler}
                    isSubtodo={isSubtodo}
                    parentId={parentId}
                    parentSubTodoId={parentSubTodoId}
                />
            </Dialog>
        </div>
    );
}
