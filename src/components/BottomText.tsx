"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { BottomTextProps } from "@/lib/types";

const BottomText = ({
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
        <div className="flex gap-4 w-full justify-evenly mt-10">
            <div className="flex gap-3  items-center text-2xl md:text-4xl flex-wrap justify-center">
                <p>Stuck?</p>

                {
                    <Button
                        className="text-primary font-semibold text-2xl md:text-4xl px-0 hover:bg-transparent"
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
                        className="text-primary font-semibold text-2xl md:text-4xl px-0 hover:bg-transparent"
                        disabled={answer !== "" || riddleAllSolved}
                        onClick={handleGetAnswer}
                        variant="ghost"
                    >
                        Reveal Answer
                    </Button>
                ) : (
                    <Button
                        className="text-primary font-semibold text-2xl md:text-4xl px-0 hover:bg-transparent"
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
