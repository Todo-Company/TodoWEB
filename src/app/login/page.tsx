"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPage from "./loginForm";
import RegisterPage from "./registerForm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SlideIn from "@/components/ui/slideIn";

export default function LoginRegister() {
    return (
        <div className="relative grid grid-cols-[inherit] [grid-column:page]">
            <SlideIn className="absolute z-0 h-[calc(100svh_-_74px)] w-full overflow-clip [grid-column:_page] [mask-image:radial-gradient(hsl(var(--background))_20%,_transparent)]">
                <div className="absolute -inset-2 h-[200svh] w-[200vw] -translate-x-1/4 -translate-y-1/4 bg-[radial-gradient(var(--c)var(--t),transparent_0)] bg-[size:var(--s)_var(--s)] antialiased [--c:_hsl(var(--todoFinished-foreground))] [--s:_20px] [--t:_1px] sm:[--s:_25px] md:[--s:_30px] lg:[--s:_35px] xl:[--s:_40px]"></div>
            </SlideIn>

            <Tabs
                defaultValue="login"
                className="relative z-10 mx-auto mt-8 w-full max-w-[400px] [grid-column:content]"
                asChild
            >
                <SlideIn className="delay-100">
                    <TabsList className="grid w-full grid-cols-2 drop-shadow-xl">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <Card className="mx-auto mt-4 drop-shadow-xl">
                        <TabsContent value="login">
                            <LoginPage />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterPage />
                        </TabsContent>

                        <CardFooter className="grid gap-4 pt-4">
                            <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Login using media
                            </CardTitle>
                            <Button variant={"secondary"} asChild>
                                <Link href="/" className="grid h-fit grid-cols-[1.5rem_1fr] items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-github w-6 place-self-start fill-none stroke-muted-foreground stroke-2"
                                    >
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                    <span className="-translate-x-6 text-center">GitHub</span>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </SlideIn>
            </Tabs>
        </div>
    );
}
