import { Command } from "lucide-react";

export default function CtrlPlus(props: { letter: string }) {
    return (
        <code className="relative flex  items-center rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm font-semibold">
            {/Mac OS X/.test(navigator.userAgent) ?
                <Command className="w-4" />
            :   "ctrl"}
            +{props.letter}
        </code>
    );
}
