// import {useUser} from "@auth0/nextjs-auth0/client";
import {UserRound} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {} from 'ldrs';
import Link from "next/link";
import {
    Avatar,
    AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {useSession} from "next-auth/react";

export function User() {
    const {data: session, status} = useSession();

    if (session) {
        const user = session.user;
        if (user !== null) {
            let initals = user.username?.charAt(0).toUpperCase()

            return (
                user && (
                    <Link href="/user">
                        <Avatar>
                            <AvatarImage src={user.image} alt={user.username}></AvatarImage>
                            <AvatarFallback>{initals}</AvatarFallback>
                        </Avatar>
                    </Link>
                )
            );
        }

    }

    return (
        <Button variant={"outline"} size="icon" asChild>
            <Link href="/login" aria-label="User Login">
                <UserRound />
            </Link>
        </Button>
    )
}