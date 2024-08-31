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
        <header className="flex flex-col sm:flex-row w-full items-center gap-6 justify-between ">
            <Button
                size="sm"
                className="text-md hidden sm:inline-flex"
                variant={"custom"}
                onClick={handleSignOut}
            >
                Sign Out
            </Button>
            <div className="flex flex-col gap-y-2">
                <Link href={"/"}>
                    <div className="flex items-center gap-2 justify-center hover:scale-110 transition-all ease-in-out">
                        <h1 className="text-6xl font-bold text-primary">¿</h1>
                        <h1 className="text-5xl font-bold">RiddleRealm.</h1>
                    </div>
                </Link>
                <div className="flex w-full justify-center items-center">
                    <Link href="/stats">
                        <Button className="text-2xl font-bold" variant="link">
                            Stats
                        </Button>
                    </Link>
                </div>
            </div>
            <ThemeToggle className="hidden sm:inline-flex" />

            <div className="sm:hidden flex gap-4 items-center">
                <Button
                    size="sm"
                    className="text-md"
                    variant={"custom"}
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
                <ThemeToggle />
            </div>
        </header>
    );
}
