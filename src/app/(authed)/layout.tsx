import Header from "@/components/Header";
import Image from "next/image";
const background = "/Designer (4).jpeg";

export default function Home({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24">
            {/* <Image
                src={background}
                alt="background"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className="-z-10 opacity-80"
            /> */}
            <Header />
            {children}
        </main>
    );
}
