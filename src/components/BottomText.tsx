"use client";

import { Button } from "./ui/button";
import { BottomTextProps } from "@/lib/types";
import { cn } from "@/lib/cn";

const BottomText = ({
    className,
    answer = "",
    riddleAllSolved = false,
    hintAllUsed,
    difficulty,
    handleNewRiddle,
    handleGetAnswer,
    handleGetHint,
    answerDisabled,
}: BottomTextProps) => {
    return (
        <div className={cn("flex gap-4 w-full justify-evenly", className)}>
            <div className="flex gap-3  items-center text-4xl flex-wrap justify-center">
                <p>Stuck?</p>

                {
                    <Button
                        className="text-primary font-semibold text-4xl px-0 hover:bg-transparent  animate-wiggle disabled:animate-none"
                        variant="ghost"
                        disabled={answer !== "" || riddleAllSolved}
                        onClick={() => handleNewRiddle(difficulty || "all")}
                    >
                        Generate
                    </Button>
                }

                <p>a New Riddle.</p>
                {!hintAllUsed && <p>Or</p>}
                {hintAllUsed && !answerDisabled ? (
                    <Button
                        className="text-primary font-semibold text-4xl px-0 hover:bg-transparent  animate-wiggle disabled:animate-none "
                        disabled={answer !== "" || riddleAllSolved}
                        onClick={handleGetAnswer}
                        variant="ghost"
                    >
                        Reveal Answer
                    </Button>
                ) : (
                    <Button
                        className="text-primary font-semibold text-4xl px-0 hover:bg-transparent  animate-wiggle disabled:animate-none "
                        disabled={hintAllUsed || riddleAllSolved}
                        onClick={handleGetHint}
                        variant="ghost"
                    >
                        {hintAllUsed ? "All Hints Used" : "Get Hint"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BottomText;
