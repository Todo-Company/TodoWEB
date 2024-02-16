"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const { theme } = useTheme();

    useEffect(() => {
        async function getLoader() {
            const { zoomies } = await import("ldrs");
            zoomies.register();
        }
        getLoader();
    }, []);

    const formSchema = z.object({
        name: z.string().min(1, { message: "Username has to be filled." }),
        email: z.string().min(1, { message: "Email has to be filled." }).email(),
        password: z.string().min(8, { message: "Password must be atleast 8 characters long." }),
    });

    const { formState, ...form } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const { isSubmitting } = formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (response.status !== 200) {
            toast("User already exists or something went wrong.");
        }

        router.push("/login");
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Register your account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} formState={formState}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl className="!mt-0">
                                        <Input
                                            placeholder="username"
                                            autoComplete="new-username"
                                            type="text"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="!mt-0">
                                        <Input
                                            placeholder="email@email.com"
                                            autoComplete="new-email"
                                            type="email"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="transition-all" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl className="!mt-0">
                                        <Input
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            type="password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button variant={"default"} type="submit" className="mt-8" disabled={isSubmitting}>
                            {!isSubmitting ?
                                "Register"
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
            </CardContent>
        </>
    );
}
