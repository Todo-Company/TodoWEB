"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

import { Calendar as CalendarIcon, Menu, LogOut, Settings2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ModeToggle } from "@/components/ModeToggle";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { User } from "@/components/header/User";

import CtrlPlus from "@/components/ui/shortcut";
import Tutorial from "../tutorial";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BookOpenText } from "lucide-react";
import SlideIn from "@/components/ui/slideIn";

export default function Header() {
    const [date, setDate] = React.useState<Date>();
    const [open, setOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const [tutorialOpen, tutorialSetOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "?" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                tutorialSetOpen((tutorialOpen) => !tutorialOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <header className="grid grid-cols-[inherit] border-b border-border py-4 [grid-column:_page]">
            <SlideIn className="flex items-center [grid-column:_content]">
                <Link href={"/"} className="flex items-center gap-4">
                    <svg
                        width="40"
                        viewBox="0 0 75 75"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-foreground"
                    >
                        <path
                            d="M65.625 25C65.6238 23.904 65.3347 22.8275 64.7859 21.8786C64.2375 20.9298 63.4491 20.1418 62.5 19.5938L40.625 7.09375C39.675 6.54519 38.5972 6.25641 37.5 6.25641C36.4028 6.25641 35.325 6.54519 34.375 7.09375L12.5 19.5938C11.5508 20.1418 10.7624 20.9298 10.2139 21.8786C9.66544 22.8275 9.37613 23.904 9.375 25V50C9.37613 51.0959 9.66544 52.1725 10.2139 53.1213C10.7624 54.0703 11.5508 54.8581 12.5 55.4062L34.375 67.9062C35.325 68.4547 36.4028 68.7437 37.5 68.7437C38.5972 68.7437 39.675 68.4547 40.625 67.9062L62.5 55.4062C63.4491 54.8581 64.2375 54.0703 64.7859 53.1213C65.3347 52.1725 65.6238 51.0959 65.625 50V25Z"
                            className="fill-background stroke-foreground stroke-[6px]"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10.3127 21.875L37.5001 37.5L64.6879 21.875"
                            strokeLinecap="round"
                            className="stroke-foreground stroke-2"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M37.5 68.75V37.5"
                            className="stroke-foreground stroke-2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M36.5 37L11 21.875L37.5 6.25L64.0625 21.875L65 53.5L37.5 68.5L36.5 37Z"
                            className="fill-foreground"
                        />
                    </svg>

                    <h1 className="scroll-m-20 font-serif text-2xl font-black uppercase tracking-wide max-sm:hidden">
                        TODO
                    </h1>
                </Link>

                <div className="ml-auto flex gap-4">
                    {(session === null && status === "unauthenticated") || status === "loading" ? null : (
                        <>
                            <nav className="flex gap-4" aria-label="Date and Search navigation">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            onClick={() => setOpen(!open)}
                                            variant={"outline"}
                                            className="group max-lg:p-2"
                                        >
                                            <div className="flex w-[280px] justify-between gap-8 text-muted-foreground max-lg:hidden">
                                                <span className="flex items-center font-normal transition-colors group-hover:!text-foreground">
                                                    <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 stroke-muted-foreground stroke-1 opacity-50 transition-all group-hover:!stroke-foreground group-hover:opacity-100" />
                                                    Search for TODOs
                                                </span>
                                                <CtrlPlus letter="k" />
                                            </div>
                                            <div className="lg:hidden">
                                                <Menu className="h-4 w-4" />
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput tabIndex={1} placeholder="Type a command or search..." />
                                            <CommandList className="antialiased">
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup heading="Todos">
                                                    <CommandItem>
                                                        All
                                                        <CommandShortcut>
                                                            <CtrlPlus letter="a" />
                                                        </CommandShortcut>
                                                    </CommandItem>

                                                    <CommandItem>
                                                        String
                                                        <CommandShortcut>
                                                            <CtrlPlus letter="s" />
                                                        </CommandShortcut>
                                                    </CommandItem>
                                                    <CommandItem>
                                                        Progressed
                                                        <CommandShortcut>
                                                            <CtrlPlus letter="p" />
                                                        </CommandShortcut>
                                                    </CommandItem>
                                                </CommandGroup>
                                                <CommandSeparator />
                                                <CommandGroup heading="Application">
                                                    <Dialog open={tutorialOpen} onOpenChange={tutorialSetOpen}>
                                                        <DialogTrigger className="w-full">
                                                            <CommandItem
                                                                onSelect={() =>
                                                                    tutorialSetOpen((tutorialOpen) => !tutorialOpen)
                                                                }
                                                                className="flex w-full justify-between gap-2 text-left"
                                                            >
                                                                <BookOpenText className="w-4 stroke-muted-foreground" />
                                                                Tutorial
                                                                <CommandShortcut>
                                                                    <CtrlPlus letter="?" />
                                                                </CommandShortcut>
                                                            </CommandItem>
                                                        </DialogTrigger>

                                                        <Tutorial />
                                                    </Dialog>

                                                    <CommandItem className="flex cursor-pointer items-center gap-2">
                                                        <Settings2
                                                            className="w-4 stroke-muted-foreground" // TODO
                                                        />
                                                        Settings
                                                    </CommandItem>
                                                    <CommandItem
                                                        className="flex cursor-pointer items-center gap-2"
                                                        onSelect={async () => await signOut()}
                                                    >
                                                        <LogOut className="w-4 stroke-muted-foreground" />
                                                        Signout
                                                    </CommandItem>
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal max-lg:hidden",
                                                    !date && "text-muted-foreground",
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                            <Button variant={"outline"} size={"icon"} className="lg:hidden">
                                                <CalendarIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </nav>

                            <div className="hidden">
                                <Dialog open={tutorialOpen} onOpenChange={tutorialSetOpen}>
                                    <Tutorial />
                                </Dialog>
                            </div>
                        </>
                    )}
                    <ModeToggle />

                    <User />
                </div>
            </SlideIn>
        </header>
    );
}
