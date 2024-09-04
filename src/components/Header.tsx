"use client";

import { signOutAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
    const path = usePathname();
    const router = useRouter();
    const signedOut = path === "/sign-up" || path === "/sign-in";

    const handleSignOut = async () => {
        await signOutAction();
        router.replace("/sign-up");
    };

    return (
        <header className="flex flex-col sm:flex-row w-full items-center gap-6 justify-between border border-red-500 ">
            {!signedOut && (
                <Button
                    className="text-lg hidden sm:inline-flex hover:bg-transparent hover:text-primary transition-all ease-in-out hover:scale-105"
                    variant={"ghost"}
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            )}

            <div className="flex flex-col gap-y-2">
                <Link href={"/"}>
                    <div className="flex items-center gap-2 justify-center hover:scale-110 transition-all ease-in-out">
                        <h1 className="text-6xl font-bold text-primary">¿</h1>
                        <h1 className="text-5xl font-bold">RiddleRealm.</h1>
                    </div>
                </Link>
                {!signedOut && (
                    <div className="hidden sm:flex w-full justify-center items-center">
                        <Link href="/stats">
                            <Button
                                className="text-2xl font-bold"
                                variant="link"
                            >
                                Stats
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <ThemeToggle className="hidden sm:inline-flex" />

            {!signedOut ? (
                <div className="sm:hidden grid grid-cols-3 gap-4 items-center justify-items-center">
                    <>
                        <Button
                            size="sm"
                            className="text-md"
                            variant="ghost"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                        <Link href="/stats">
                            <Button
                                className="text-2xl font-bold"
                                variant="link"
                            >
                                Stats
                            </Button>
                        </Link>
                    </>
                    <ThemeToggle />
                </div>
            ) : (
                <ThemeToggle className="sm:hidden" />
            )}
        </header>
    );
}
