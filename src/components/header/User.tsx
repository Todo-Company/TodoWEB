import { UserRound, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { ring } from "ldrs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "next-themes";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";

export function User() {
    const { data, status } = useSession();
    const { theme } = useTheme();
    ring.register();

    if (status === "loading")
        return (
            <Button variant={"outline"} size="icon" disabled>
                <l-ring size="20" speed="2" stroke="2.5" color={theme === "dark" ? "white" : "black"} />
            </Button>
        );

    if (data) {
        const user = data.session.user;
        if (!user.name || user.name.trim() === "") return "A";

        const namePart = user.name.split(" ");
        const initials =
            namePart.length === 1 ?
                user.name.charAt(0).toUpperCase()
                :   `${user.name.charAt(0).toUpperCase()}${namePart[namePart.length - 1].charAt(0).toUpperCase()}`;
        return (
            user && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"ghost"} className="rounded-full p-0">
                            <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="grid w-screen max-w-[40ch]">
                        <div className="grid grid-cols-[min-content_auto_min-content] items-center gap-x-4 gap-y-1">
                            <Avatar className="row-span-2">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <h2 className="line-clamp-1 break-all text-lg font-semibold">{user.name}</h2>
                            <Button
                                onClick={() => setEditMode(true)}
                                variant={"ghost"}
                                className="group h-6 w-6 p-1"
                                tabIndex={1}
                            >
                                <Pencil className="cursor-pointer stroke-muted-foreground transition-colors group-hover:stroke-foreground" />
                            </Button>
                            <small className="col-span-2 line-clamp-1 break-all pb-1 text-xs font-medium leading-none text-muted-foreground">
                                {user.email}
                            </small>
                        </div>

                        <Button variant={"destructive"} className="mt-4" tabIndex={2} onClick={() => signOut()}>
                            Logout
                        </Button>
                    </PopoverContent>
                </Popover>
            )
        );
    }

    return (
        <Button variant={"outline"} size="icon" asChild>
            <Link href="/login" aria-label="User Login">
                <UserRound />
            </Link>
        </Button>
    );
}