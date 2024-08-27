"use client";

import { Button } from "@/components/ui/button";
import CenterInput from "./CenterInput";
import { Loader2 } from "lucide-react";

import { useState, useTransition } from "react";
import { checkRiddleAnswer } from "@/actions/riddles";

type Props = {
    riddleId: string;
    hintsUsed: number;
    answerShown: boolean;
    inputValue: string;
    handleInputChange: (e) => void;
};
const RiddleForm = (props: Props) => {
    const [isPending, startTransition] = useTransition();

    const { riddleId, hintsUsed, answerShown, inputValue, handleInputChange } =
        props;

    const handleSubmit = async () => {
        startTransition(async () => {
            await checkRiddleAnswer(
                inputValue,
                riddleId,
                hintsUsed,
                answerShown
            );
        });
    };

    return (
        <form className="space-y-8 flex flex-col w-full gap-4 justify-center  items-center">
            <CenterInput
                inputValue={inputValue}
                handleInputChange={handleInputChange}
            />

            <Button
                variant="custom"
                size="md"
                type="submit"
                disabled={isPending}
                className="h-full"
                onClick={handleSubmit}
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
};

export default RiddleForm;
