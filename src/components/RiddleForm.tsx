"use client";

import { Button } from "@/components/ui/button";
import CenterInput from "./CenterInput";
import { Loader2 } from "lucide-react";

import { useTransition } from "react";
import { checkRiddleAnswer } from "@/actions/riddles";
import { RiddleFormProps } from "@/lib/types";

const RiddleForm = (props: RiddleFormProps) => {
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
            <button
                type="submit"
                disabled={isPending}
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
