import Header from "@/components/Header";
import Image from "next/image";
const background = "/background.png";

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
                className="-z-10 hidden md:block md:object-contain object-bottom"
            /> */}
            <Header />
            {children}
        </main>
    );
}
