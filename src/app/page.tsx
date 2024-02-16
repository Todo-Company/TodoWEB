"use client";

import {useSession} from "next-auth/react";
import {Dashboard} from "@/components/dashboard/Dashboard";
import {Homepage} from "@/components/homepage/Homepage";

export default function Home() {
    const { data, status } = useSession();

    return (
        <main className="[grid-column:_content]">
            {status === 'authenticated' ? (
                <Dashboard/>
            ) : (
                <Homepage/>
            )}
        </main>
    );
}
