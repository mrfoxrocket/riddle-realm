"use client";

import { signOutAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOutAction();
        router.replace("/sign-up");
    };

    return (
        <main className="flex w-full justify-between">
            <Button onClick={handleSignOut}>Sign Out</Button>
            <h1 className="text-4xl font-bold">RiddleRealm.</h1>
            <ThemeToggle />
        </main>
    );
}
