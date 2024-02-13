"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function LoginPage(props) {
    const formSchema = z.object({
        email: z.string().min(1, { message: "Email has to be filled." }).email(),
        password: z.string().min(8, { message: "Password must be atleast 8 characters long." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // await signIn("credentials", {
        //     ...data,
        //     redirect: false,
        // });

        // router.push("/");

        console.log(values);
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Login to your account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="!mt-0">
                                        <Input placeholder="email@email.com" type="email" {...field} />
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
                                        <Input placeholder="Password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button variant={"link"} asChild className="w-fit !px-0 !text-left text-muted-foreground">
                            <a href="#">Forgot password?</a>
                        </Button>

                        <Button variant={"default"} type="submit" className="mt-4">
                            Sign in
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </>
    );
}
