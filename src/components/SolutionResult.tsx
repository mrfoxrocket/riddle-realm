"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

const SolutionResult = ({
    riddleResult,
    handleNewRiddle,
    answer,
    difficulty,
}: {
    riddleResult: boolean;
    handleNewRiddle: (difficulty: string) => Promise<void>;
    answer: string;
    difficulty: string;
}) => {
    const [open, setOpen] = useState(riddleResult || answer !== "");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setOpen(riddleResult || answer !== "");
    }, [riddleResult, answer]);

    const handleClick = async () => {
        startTransition(async () => {
            await handleNewRiddle(difficulty);
            setOpen(false);
        });
    };

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="flex flex-col gap-8 justify-center items-center ">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl md:text-5xl w-full text-center">
                        {answer !== ""
                            ? `The Answer was: ${answer}`
                            : "Congratulations! You got it right!"}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        className="text-xl md:text-3xl p-6 md:p-8 text-white"
                        onClick={() => handleClick()}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Next Riddle"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SolutionResult;
