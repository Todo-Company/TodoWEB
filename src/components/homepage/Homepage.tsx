import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Homepage() {
    return (
        <div className="grid max-w-[60ch]">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                It would seem like you are not logged in!
            </h2>
            <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                Please log in to use this application. Being logged in is necessary for cross device synchronization.
            </p>
            <Link href={"/login"}>
                <Button variant={"default"} className="mt-8">
                    Log In
                </Button>
            </Link>
        </div>
    );
}
