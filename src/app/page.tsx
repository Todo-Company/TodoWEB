"use client";

import { useSession } from "next-auth/react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Homepage } from "@/components/homepage/Homepage";
import FooterComponent from "@/components/footer/footer";

export default function Home() {
    const { data, status } = useSession();

    return (
        <main className="grid grid-cols-[inherit] [grid-column:_page]">
            {status === "authenticated" ?
                <>
                    <Dashboard />
                    <FooterComponent />
                </>
            :   <Homepage />}
        </main>
    );
}
