import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RiddleRealm | Enter a World of Riddles",
    description:
        "Dive into a world of riddles tailored just for you. Solve challenges, track your progress, and compare your achievements with others in RiddleRealm.",
    keywords:
        "RiddleRealm, riddles, puzzles, brain teasers, challenge, riddle-solving, fun riddles, riddles game, online riddles",
    openGraph: {
        title: "RiddleRealm - Enter a World of Riddles",
        description:
            "Explore new riddles, track your stats, and engage with a community of riddle enthusiasts in RiddleRealm.",
        url: "https://riddlerealm.app/",
        siteName: "RiddleRealm",
    },
    twitter: {
        card: "summary_large_image",
        title: "RiddleRealm - Enter a World of Riddles",
        description: "Solve riddles and track your progress in RiddleRealm.",
    },
    alternates: {
        canonical: "/",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={dosis.className}>
                <main
                    className="flex min-h-screen w-full h-full flex-col items-center justify-start gap-10 p-8 
                    bg-gradient-to-t from-primary/80 via-[#283328] via-99% to-[#16151a]"
                >
                    <Header />
                    {children}
                </main>
            </body>
        </html>
    );
}
