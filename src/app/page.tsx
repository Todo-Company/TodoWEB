import Header from "@/components/header";

export default function Home() {
    return (
        <>
            <div className="grid grid-cols-[inherit] [grid-column:page] max-md:landscape:hidden">
                <Header />
                <main></main>
            </div>
            <div className="hidden min-h-[100svh] items-center justify-center [grid-column:content] max-md:landscape:flex">
                <span>Use portrait orientation.</span>
            </div>
        </>
    );
}
