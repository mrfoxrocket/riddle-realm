import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | RiddleRealm",
    description:
        "Create your account by solving a riddle and embedding the answer in your username. Join the challenge in RiddleRealm!",
    openGraph: {
        title: "Sign Up - RiddleRealm",
        description:
            "Solve a riddle, embed the answer in your username, and join the RiddleRealm community.",
        url: "https://riddle-realm-two.vercel.app/sign-up",
        siteName: "RiddleRealm",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign Up - RiddleRealm",
        description:
            "Join RiddleRealm by solving a riddle and creating a unique username.",
    },
    alternates: {
        canonical: "/sign-up",
    },
};

export default function SignupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
