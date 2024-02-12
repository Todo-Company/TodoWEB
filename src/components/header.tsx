"use client";

import * as React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Command } from "cmdk";

export default function Header() {
    const [date, setDate] = React.useState<Date>();

    return (
        <header className="grid grid-cols-[inherit] border-b border-border py-4 [grid-column:_page]">
            <div className="flex [grid-column:_content]">
                <span className="flex items-center gap-4">
                    <svg
                        width="40"
                        viewBox="0 0 75 75"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-foreground"
                    >
                        <path
                            d="M65.625 25C65.6238 23.904 65.3347 22.8275 64.7859 21.8786C64.2375 20.9298 63.4491 20.1418 62.5 19.5938L40.625 7.09375C39.675 6.54519 38.5972 6.25641 37.5 6.25641C36.4028 6.25641 35.325 6.54519 34.375 7.09375L12.5 19.5938C11.5508 20.1418 10.7624 20.9298 10.2139 21.8786C9.66544 22.8275 9.37613 23.904 9.375 25V50C9.37613 51.0959 9.66544 52.1725 10.2139 53.1213C10.7624 54.0703 11.5508 54.8581 12.5 55.4062L34.375 67.9062C35.325 68.4547 36.4028 68.7437 37.5 68.7437C38.5972 68.7437 39.675 68.4547 40.625 67.9062L62.5 55.4062C63.4491 54.8581 64.2375 54.0703 64.7859 53.1213C65.3347 52.1725 65.6238 51.0959 65.625 50V25Z"
                            className="stroke-foreground stroke-[6px]"
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

                    <h1 className="scroll-m-20 font-serif text-2xl font-black uppercase tracking-wide">TODO</h1>
                </span>

                <div className="ml-auto flex gap-4">
                    <nav className="flex gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </nav>
                    <ModeToggle />

                    <Button variant="outline" size="icon" asChild>
                        <a href="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-user-round w-6 fill-none stroke-current stroke-2"
                            >
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    );
}
