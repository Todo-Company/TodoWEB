import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { CommandShortcut } from "@/components/ui/command";
import CtrlPlus from "@/components/ui/shortcut";

type tutorialSlide = {
    name: string;
    content: string;
    example?: {
        name: string;
        content: string[];
    };
};

export default function Tutorial() {
    const [open, setOpen] = React.useState(false);
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "?" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex w-full justify-between text-left">
                Tutorial
                <CommandShortcut>
                    <CtrlPlus letter="?" />
                </CommandShortcut>
            </DialogTrigger>
            <DialogContent className="w-screen max-w-[120ch] overflow-x-clip rounded-lg px-0 pb-12 pt-8 max-sm:max-w-[320px] sm:mx-[--inline-gap] sm:w-[calc(100vw_-_(var(--inline-gap)_*_2))] sm:-translate-x-[calc(50%_+_var(--inline-gap))] sm:[--inline-gap:_2rem]">
                <Carousel setApi={setApi} className="flex flex-col">
                    <div className="mb-8 flex items-center px-8 *:relative *:left-0 *:right-0 *:top-0 *:translate-x-0 *:translate-y-0">
                        <CarouselPrevious variant={"ghost"} />
                        <h2 className="w-44 scroll-m-20 px-8 text-center text-4xl !font-black tracking-tight lg:text-5xl ">
                            {current} / {count}
                        </h2>
                        <CarouselNext variant={"ghost"} />
                    </div>
                    <CarouselContent className="ml-0 px-0">
                        {tutorial.map((page, index) => {
                            return (
                                <CarouselItem className="max-h-[40svh] overflow-y-auto px-8" key={index}>
                                    <div className="max-w-[260px] sm:max-w-[50ch] md:max-w-[60ch] lg:max-w-[80ch]">
                                        <h3 className="w-fit scroll-m-20 text-2xl font-semibold tracking-tight">
                                            {page.name}
                                        </h3>
                                        <p className="break-words text-justify leading-7 [&:not(:first-child)]:mt-6">
                                            {page.content}
                                        </p>
                                        {page.example && (
                                            <div className="mt-8 w-fit">
                                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                                    {page.example.name}
                                                </h4>
                                                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                                    {page.example.content.map((exampleItem, index) => {
                                                        return <li key={index}>{exampleItem}</li>;
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            </DialogContent>
        </Dialog>
    );
}

const tutorial: tutorialSlide[] = [
    {
        name: "Search",
        content:
            "Simple todos are a type of todo that doesnt rely on enything else. It is either checked aka marked as done or unchecked aka marked as to be done.",
    },
    {
        name: "Login",
        content: "Login to allow cross platform and cross device syncing.",
    },
    {
        name: "Calendar",
        content:
            "Calendar lets you filter by days. With it is possible to see into the future and into the past what was done and what is to be done.",
    },
    {
        name: "Simple Todo",
        content:
            "Simple todos are a type of todo that doesnt rely on enything else. It is either checked aka marked as done or unchecked aka marked as to be done.",
        example: {
            name: "Shoping List",
            content: ["bread", "milk", "cereal"],
        },
    },
    {
        name: "Sequential Todo",
        content:
            "Sequential todos rely on one another. One can be marked as completed only if the previous one was already finished.",
        example: {
            name: "Day planner",
            content: ["wake up", "wash my face", "eat breakfast", "go out"],
        },
    },
    {
        name: "Section Todo",
        content:
            "Section todo is finished only if all todos under it are marked as finished. Only and only then the section todo is automatically completed.",
        example: {
            name: "Event planer",
            content: ["Run marathon", "train to run", "go run", "go out"],
        },
    },
];
