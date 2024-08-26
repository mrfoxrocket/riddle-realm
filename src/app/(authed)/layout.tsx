import Header from "@/components/Header";

export default function Home({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24">
            <Header />
            {children}
        </main>
    );
}
