import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export type User = {
    id?: string;
    username: string;
    count: number;
};

const LeaderboardCard = ({ user }: { user: User }) => {
    const { username, count } = user;

    return (
        <>
            <Card className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle>{username}</CardTitle>
                </CardHeader>
                <CardContent className="items-center flex">
                    <p>{count}</p>
                </CardContent>
            </Card>
        </>
    );
};

export default LeaderboardCard;
