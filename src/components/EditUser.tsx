import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Session } from "@auth/core/types";
import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { zoomies } from "ldrs";

export function EditUser(props: { user: any; status: string }) {
    const { theme } = useTheme();
    const { data, status, update } = useSession();
    zoomies.register();

    const formSchema = z.object({
        name: z.string().min(1, { message: "This field must have a value!" }).max(50),
    });

    const editProfile = async (values: z.infer<typeof formSchema>) => {
        await update({
            name: values.name,
        });
    };

    const { formState, ...form } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.user.name,
        },
    });
    const { isSubmitting } = formState;

    return (
        <SheetContent className="sm:max-w-[40ch]">
            <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                    Here you can edit your profile, add profile picture. In the future even change
                    password/username/email.
                </SheetDescription>
            </SheetHeader>

            <Form {...form} formState={formState}>
                <form onSubmit={form.handleSubmit(editProfile)} className="mt-4 grid">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl className="!mt-0">
                                    <Input placeholder="Username" type="text" {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormDescription className="!mt-1">This is your display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={"default"} className="mt-4">
                        {!isSubmitting ?
                            "Submit"
                        :   <l-zoomies
                                size="80"
                                stroke="5"
                                bg-opacity="0.1"
                                speed="1.4"
                                color={theme === "dark" ? "black" : "white"}
                            />
                        }
                    </Button>
                </form>
            </Form>
        </SheetContent>
    );
}
