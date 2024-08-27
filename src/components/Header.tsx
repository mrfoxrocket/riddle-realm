"use client";

import { signOutAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOutAction();
        router.replace("/sign-up");
    };

    return (
        <header className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full justify-between">
                <Button onClick={handleSignOut}>Sign Out</Button>
                <h1 className="text-4xl font-bold">RiddleRealm.</h1>
                <ThemeToggle />
            </div>
            <div className="flex w-full justify-center items-center">
                <Link href="/stats">
                    <Button className="text-xl" variant="link">
                        Stats
                    </Button>
                </Link>
                <Link href="/play">
                    <Button className="text-xl" variant="link">
                        Play
                    </Button>
                </Link>
                <Link href="/leaderboard">
                    <Button className="text-xl" variant="link">
                        Leaderboard
                    </Button>
                </Link>
            </div>
        </header>
    );
}
