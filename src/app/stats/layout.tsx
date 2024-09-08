import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "RiddleRealm Stats | Your Puzzle Performance",
    description:
        "View detailed statistics about your riddle-solving performance. Track your progress, achievements, and compare your stats with others in RiddleRealm.",
    keywords:
        "riddle stats, track progress, RiddleRealm stats, achievements, riddle-solving record, leaderboard",

    openGraph: {
        title: "RiddleRealm - Your Puzzle Performance Stats",
        description:
            "Explore your riddle-solving statistics, track your progress, and see how you stack up against others in RiddleRealm.",
        url: "https://riddlerealm.app/stats",
        siteName: "RiddleRealm",
    },
    twitter: {
        card: "summary_large_image",
        title: "RiddleRealm - Your Puzzle Performance Stats",
        description:
            "Check out your riddle-solving stats and achievements in RiddleRealm.",
    },
    alternates: {
        canonical: "/stats",
    },
};

export default function StatsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
