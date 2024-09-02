"use server";

import { getMostRiddlesSolved } from "@/actions/leaderboard";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    TbHexagonNumber1Filled,
    TbHexagonNumber2Filled,
    TbHexagonNumber3Filled,
} from "react-icons/tb";
import { WobbleCard } from "./ui/wobble-card";

const LeaderboardTable = async () => {
    const leaderboardStats = await getMostRiddlesSolved();

    return (
        <WobbleCard
            containerClassName="h-full bg-green4 p-0"
            className="w-full text-center flex flex-col items-center p-0"
        >
            <Card className="flex flex-col w-full p-4 bg-transparent text-white flex-1 border-none">
                <CardHeader>
                    <CardTitle className="text-3xl">Leaderboard</CardTitle>
                    <CardDescription className="text-white text-xl">
                        Most Riddles Solved Without Answer Shown.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-white">
                                    Ranking
                                </TableHead>
                                <TableHead className="text-white">
                                    Username
                                </TableHead>
                                <TableHead className="text-right text-white">
                                    Riddles Solved
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardStats?.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {index + 1 === 1 ? (
                                            <TbHexagonNumber1Filled
                                                size={32}
                                                color="#F59E0B"
                                            />
                                        ) : index + 1 === 2 ? (
                                            <TbHexagonNumber2Filled
                                                size={32}
                                                color="#B1B1B1"
                                            />
                                        ) : index + 1 === 3 ? (
                                            <TbHexagonNumber3Filled
                                                size={32}
                                                color="#CD7F32"
                                            />
                                        ) : (
                                            <p className="text-2xl font-semibold text-center  w-[32px]">
                                                {index + 1}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-xl font-semibold text-left">
                                        {user.username as string}
                                    </TableCell>
                                    <TableCell className="text-right text-2xl">
                                        {user.count as number}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </WobbleCard>
    );
};

export default LeaderboardTable;
