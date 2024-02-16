import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "../../context/provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap"
                    rel="stylesheet"
                ></link>
                <title>TODO</title>
                <link rel="icon" href="/icon.png" type="image/png" />
            </head>
            <Provider>
                <body className="grid grid-cols-[[page-start_breakout-left-start]_minmax(var(--inline-padding),_1fr)_[content-start_breakout-right-start]_min(100%_-_var(--inline-padding)_*_2,_1400px)_[content-end_breakout-left-end]_minmax(var(--inline-padding),_1fr)_[page-end_breakout-right-end]] bg-background font-serif [--inline-padding:_1rem]">
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <div className="grid grid-cols-[inherit] [grid-column:page] max-md:landscape:hidden">
                            <Header />
                            {children}
                            <Toaster />
                        </div>
                        <div className="hidden min-h-[100svh] items-center justify-center [grid-column:content] max-md:landscape:flex">
                            <span>Use portrait orientation.</span>
                        </div>
                    </ThemeProvider>
                </body>
            </Provider>
        </html>
    );
}
