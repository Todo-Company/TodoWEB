'use client';

import Header from "@/components/header";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

export default function Home() {
    const {data: session, status} = useSession();
    return (
        <>
            <Header />
            <main>
                <Link href="/register">Register Page</Link>
                <br/>
                <Link href="/login">Login Page</Link>
                <button onClick={() => signOut()}>Sign out</button>
            </main>
        </>
    );
}
