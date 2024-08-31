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
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-2 justify-center">
                        <h1 className="text-6xl font-bold text-primary">¿</h1>
                        <h1 className="text-5xl font-bold">RiddleRealm.</h1>
                    </div>
                    <div className="flex w-full justify-center items-center">
                        <Link href="/stats">
                            <Button
                                className="text-2xl font-bold"
                                variant="link"
                            >
                                Stats
                            </Button>
                        </Link>
                        <Link href="/play">
                            <Button
                                className="text-2xl font-bold"
                                variant="link"
                            >
                                Play
                            </Button>
                        </Link>
                        <Link href="/leaderboard">
                            <Button
                                className="text-2xl font-bold"
                                variant="link"
                            >
                                Leaderboard
                            </Button>
                        </Link>
                    </div>
                </div>
                <ThemeToggle />
            </div>
        </header>
    );
}
