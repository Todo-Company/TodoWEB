"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const { toast } = useToast();

    useEffect(() => {
        async function getLoader() {
            const { zoomies } = await import("ldrs");
            zoomies.register();
        }
        getLoader();
    }, []);

    const formSchema = z.object({
        email: z.string().min(1, { message: "Email has to be filled." }).email(),
        password: z.string().min(8, { message: "Password must be atleast 8 characters long." }),
    });

    const { formState, ...form } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { isSubmitting } = formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let res = await signIn("credentials", {
            ...values,
            redirect: false,
        });

        if (res && res.ok) {
            router.push("/");
            toast({
                variant: "default",
                description: "Successfully logged in",
            });
        } else {
            toast({
                variant: "destructive",
                description: "Something went wrong, please try again.",
            });
        }
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Login to your account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} formState={formState}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="!mt-0">
                                        <Input
                                            placeholder="email@email.com"
                                            autoComplete="current-email"
                                            type="email"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl className="!mt-0">
                                        <Input
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            type="password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button variant={"link"} asChild className="w-fit !px-0 !text-left text-muted-foreground">
                            <a href="#">Forgot password?</a>
                        </Button>

                        <Button variant={"default"} type="submit" className="mt-4" disabled={isSubmitting}>
                            {!isSubmitting ?
                                "Log in"
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
