import { useUser } from "@auth0/nextjs-auth0/client";
import { UserRound, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { ring } from "ldrs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function User() {
    const { user, error, isLoading } = useUser();
    ring.register();

    if (isLoading)
        return (
            <Button variant={"outline"} size="icon">
                <l-ring size="20" speed="2" stroke="2.5" color="white"></l-ring>
            </Button>
        );
    if (error) return <div>{error.message}</div>;

    if (user !== undefined) {
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
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.picture} alt={user.name} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="grid w-[40ch]">
                        <div className="grid grid-cols-[min-content_auto_min-content] items-center gap-x-4 gap-y-1">
                            <Avatar className="row-span-2">
                                <AvatarImage src={user.picture} alt={user.name} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <h2 className="line-clamp-1 break-all text-lg font-semibold">{user.nickname}</h2>
                            <Button
                                onClick={() => setEditMode(true)}
                                variant={"ghost"}
                                className="group h-6 w-6 p-1"
                                asChild
                            >
                                <Pencil className=" stroke-muted-foreground transition-colors group-hover:stroke-foreground" />
                            </Button>
                            <small className="col-span-2 line-clamp-1 break-all pb-1 text-xs font-medium leading-none text-muted-foreground">
                                {user.email}
                            </small>
                        </div>

                        <Button variant={"destructive"} asChild className="mt-4">
                            <a href="/api/auth/logout">Logout</a>
                        </Button>
                    </PopoverContent>
                </Popover>
            )
        );
    }

    return (
        <Button variant={"outline"} size="icon" asChild>
            <a href="/api/auth/login" aria-label="User Login">
                <UserRound />
            </a>
        </Button>
    );
}
