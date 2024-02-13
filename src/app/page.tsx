"use client";

import Header from "@/components/header";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
    return (
        <>
            <div className="grid grid-cols-[inherit] [grid-column:page] max-md:landscape:hidden">
                <Header />
                <main>
                    <Link href="/register">Register Page</Link>
                    <br />
                    <Link href="/login">Login Page</Link>
                    <button onClick={() => signOut()}>Sign out</button>
                </main>
            </div>
            <div className="hidden min-h-[100svh] items-center justify-center [grid-column:content] max-md:landscape:flex">
                <span>Use portrait orientation.</span>
            </div>
            <Toaster />
        </>
    );
}
