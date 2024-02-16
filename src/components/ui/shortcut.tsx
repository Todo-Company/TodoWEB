import { Command } from "lucide-react";
import { useEffect, useState } from "react";

export default function CtrlPlus(props: { letter: string }) {
    const [isMac, setIsMac] = useState(false);
    useEffect(() => {
        if (/Mac OS X/.test(navigator.userAgent)) {
            setIsMac(true);
        }
    }, [])

    return (
        <code className="relative flex  items-center rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm font-semibold">
            { isMac ?
                <Command className="w-4" />
            :   "ctrl"}
            +{props.letter}
        </code>
    );
}
