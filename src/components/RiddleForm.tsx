"use client";

import CenterInput from "./CenterInput";
import { Loader2 } from "lucide-react";

import { useEffect, useState, useTransition } from "react";
import { checkRiddleAnswer } from "@/actions/riddles";
import { RiddleFormProps } from "@/lib/types";

const RiddleForm = (props: RiddleFormProps) => {
    const [isPending, startTransition] = useTransition();
    const [wrongAnswerMessage, setWrongAnswerMessage] = useState(false);

    const {
        riddleId,
        hintsUsed,
        answerShown,
        inputValue,
        handleInputChange,
        riddleResult,
        setRiddleResult,
    } = props;

    useEffect(() => {
        setWrongAnswerMessage(false);
    }, [inputValue]);

    const handleSubmit = async () => {
        startTransition(async () => {
            const result = await checkRiddleAnswer(
                inputValue,
                riddleId,
                hintsUsed,
                answerShown,
            );

            setRiddleResult(result);

            setWrongAnswerMessage(!result);
        });
    };

    return (
        <form className="space-y-8 flex flex-col w-full gap-4 justify-center  items-center">
            <div className="flex flex-col gap-2 w-full">
                <CenterInput
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                />
                <div className="w-full text-red-500 font-bold text-2xl text-center h-[64px] sm:h-[32px]">
                    <p hidden={!wrongAnswerMessage}>
                        {inputValue === ""
                            ? "Please type in an answer."
                            : "That is not the correct answer, please try again."}
                    </p>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending || riddleResult}
                onClick={handleSubmit}
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 transition-all ease-in-out"
            >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22c55e_0%,#16a34a_50%,#15803d_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-transparent px-4 py-2 text-3xl font-medium text-white backdrop-blur-3xl">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Check Solution"
                    )}
                </span>
            </button>
        </form>
    );
};

export default RiddleForm;
