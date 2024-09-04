export const metadata = {
    title: "Sign In | RiddleRealm",
    description:
        "Sign in to your RiddleRealm account. Continue solving riddles and challenging yourself!",
    openGraph: {
        title: "Sign In - RiddleRealm",
        description:
            "Sign in to your account on RiddleRealm and pick up where you left off.",
        url: "https://riddle-realm-two.vercel.app/sign-in",
        siteName: "RiddleRealm",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign In - RiddleRealm",
        description:
            "Access your RiddleRealm account and continue solving challenging riddles.",
    },
    alternates: {
        canonical: "/sign-in",
    },
};

export default function SigninLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
