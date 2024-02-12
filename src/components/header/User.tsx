import {useUser} from "@auth0/nextjs-auth0/client";
import {UserRound} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {} from 'ldrs';
import Link from "next/link";
import {
    Avatar,
    AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function User() {

    const { user, error, isLoading } = useUser();

    if (isLoading) return (
        <Button variant={"outline"} size="icon" asChild>
            <div>
                <l-line-spinner
                    size="20"
                    stroke="2"
                    speed="1"
                    color="white"
                ></l-line-spinner>
            </div>
        </Button>
    );
    if (error) return <div>{error.message}</div>;


    if (user !== undefined) {
        let initals = user.name?.charAt(0).toUpperCase()

        return (
            user && (
                <Link href="/user">
                    <Avatar>
                        <AvatarImage src={user.picture} alt={user.name}></AvatarImage>
                        <AvatarFallback>{initals}</AvatarFallback>
                    </Avatar>
                </Link>
            )
        );
    }

    return (
        <Button variant={"outline"} size="icon" asChild>
            <a href="/api/auth/login" aria-label="User Login">
                <UserRound />
            </a>
        </Button>
    )
}