import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Homepage() {
    return (
        <div className="relative grid grid-cols-[inherit] [grid-column:page]">
            <div className="absolute z-0 h-[calc(100svh_-_74px)] w-full overflow-clip [grid-column:_page] [mask-image:radial-gradient(hsl(var(--background)),_transparent_80%)]">
                <div className="absolute -inset-2 h-[200svh] w-[200vw] -translate-x-1/4 -translate-y-1/4 skew-x-[-25deg] skew-y-[-2deg] bg-[linear-gradient(0deg,var(--c)var(--t),transparent_.1px_100%),linear-gradient(90deg,var(--c)var(--t),transparent_.1px_100%)] bg-[size:var(--s)_var(--s)] antialiased [--c:_hsl(var(--todoFinished-foreground))] [--s:_30px] [--t:_1px] sm:[--s:_35px] md:[--s:_40px] lg:skew-x-[-32deg] lg:[--s:_45px] xl:[--s:_50px]"></div>
            </div>
            <div className="relative z-10 mt-12 grid h-fit max-w-[60ch] py-20 [grid-column:_content] ">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight drop-shadow-xl first:mt-0 ">
                    It would seem like you are not logged in!
                </h2>
                <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                    Please log in to use this application. Being logged in is necessary for cross device
                    synchronization.
                </p>
                <Link href={"/login"} className="mt-8 w-fit">
                    <Button variant={"default"}>Log In</Button>
                </Link>
            </div>
        </div>
    );
}
