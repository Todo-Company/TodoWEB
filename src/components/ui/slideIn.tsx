import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SlideInProps = {
    className?: string;
    children: ReactNode;
    [key: string]: any;
};

export default function SlideIn({ className, children, ...props }: SlideInProps) {
    const [contentVisible, setContentVisible] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setContentVisible(true);
        }, 100);
    }, []);

    return (
        <div
            className={cn(`transition-all duration-700 ${!contentVisible && "scale-90 opacity-0"}`, className)}
            {...props}
        >
            {children}
        </div>
    );
}
