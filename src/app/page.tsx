"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getHints, getRandomRiddle, getAnswer } from "@/actions/riddles";
import RiddleForm from "@/components/RiddleForm";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import DifficultySelect from "@/components/DifficultySelect";
import { Riddle } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Modak } from "next/font/google";

const modak = Modak({ weight: ["400"], subsets: ["latin"] });

function Home() {
    const [riddle, setRiddle] = useState<Riddle | null>(null);
    const [answer, setAnswer] = useState("");
    const [difficulty, setDifficulty] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const [hint, setHint] = useState({
        text: "",
        index: 0,
        allUsed: false,
    });

    useEffect(() => {
        handleNewRiddle(difficulty);
    }, [difficulty]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };

    const handleNewRiddle = async (difficulty: string) => {
        try {
            const response = await getRandomRiddle(difficulty);
            setRiddle(response);
            setAnswer("");
            setInputValue("");

            setHint({ text: "", index: 0, allUsed: false });
        } catch (error) {
            console.error("Error fetching new riddle:", error);
        }
    };

    const handleGetHint = async () => {
        if (!riddle || !riddle.id) return;
        try {
            const hints = await getHints(riddle.id);

            if (hints.length > 0) {
                setHint({
                    text: hints[hint.index].hintText,
                    index: hint.index + 1,
                    allUsed: hints.length === hint.index + 1,
                });
            }
        } catch (error) {
            console.error("Error fetching hint:", error);
        }
    };

    const handleGetAnswer = async () => {
        try {
            if (riddle?.id !== undefined) {
                setAnswer(await getAnswer(riddle?.id));
            }
        } catch (error) {
            console.error("Error fetching answer:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full flex-1 items-center sm:pl-10  ">
            <h1
                className={` ${modak.className} heading text-[10vw]  font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-primary to-green5 bg-opacity-50`}
            >
                SOLVE A RIDDLE
            </h1>

            <DifficultySelect
                difficulty={difficulty}
                handleDifficultyChange={handleDifficultyChange}
            />

            {/* Riddle */}
            <h2 className="text-3xl flex w-full p-4 justify-center text-center ">
                {!riddle?.allSolved &&
                    (riddle ? (
                        <TextGenerateEffect
                            key={riddle.question}
                            className="max-w-[600px] font-normal text-neutral-600 dark:text-neutral-400 text-3xl text-center "
                            duration={1}
                            filter={false}
                            words={riddle.question ?? ""}
                        />
                    ) : (
                        <div className="flex w-full  items-center flex-col gap-4">
                            <Skeleton className="h-10 rounded-full w-full max-w-[600px]" />
                            <Skeleton className="h-10 rounded-full w-full max-w-[300px]" />
                        </div>
                    ))}
                {riddle?.allSolved && difficulty !== "all" && (
                    <TextGenerateEffect
                        key={riddle.question}
                        className="max-w-[600px] font-normal text-primary  text-3xl text-center"
                        duration={1}
                        filter={false}
                        words="You've Solved All The Riddles In This Difficulty!"
                    />
                )}
                {riddle?.allSolved && difficulty === "all" && (
                    <TextGenerateEffect
                        key={riddle.question}
                        className="max-w-[600px] font-normal text-primary  text-3xl text-center"
                        duration={1}
                        filter={false}
                        words="Congratulations! You've Solved All The Riddles We Have!"
                    />
                )}
            </h2>

            {/* Answer / Hint */}
            <div className="text-2xl text-primary min-h-16 text-center ">
                {answer !== "" ? (
                    <TextGenerateEffect
                        key={answer}
                        className="max-w-[600px] font-normal text-primary  "
                        duration={1}
                        filter={false}
                        words={answer}
                    />
                ) : (
                    <TextGenerateEffect
                        key={hint.text}
                        className="max-w-[600px] font-normal text-primary "
                        duration={1}
                        filter={false}
                        words={hint.text}
                    />
                )}
            </div>

            {/* RiddleForm */}
            {riddle && riddle.id && !riddle.allSolved ? (
                <RiddleForm
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    riddleId={riddle.id}
                    hintsUsed={hint.index}
                    answerShown={answer !== ""}
                />
            ) : (
                <div className="space-y-8 flex flex-col w-full gap-4 justify-center  items-center">
                    <Skeleton className="h-10 rounded-full w-full" />
                    <Skeleton className="h-14 w-[200px]" />
                </div>
            )}

            {/* // Stuck? Generate a New Riddle. Or Get Hint */}
            <div className="flex gap-4 w-full justify-evenly mt-10">
                <div className="flex gap-3  items-center text-2xl md:text-4xl flex-wrap justify-center">
                    <p>Stuck?</p>

                    <Button
                        className="text-primary text-2xl md:text-4xl px-0 hover:bg-transparent"
                        variant="ghost"
                        disabled={answer !== "" || riddle?.allSolved}
                        onClick={() => handleNewRiddle(difficulty)}
                    >
                        Generate
                    </Button>

                    <p>a New Riddle.</p>
                    <p>Or</p>
                    {hint.allUsed ? (
                        <Button
                            className="text-primary text-2xl md:text-4xl px-0 hover:bg-transparent"
                            disabled={answer !== "" || riddle?.allSolved}
                            onClick={handleGetAnswer}
                            variant="ghost"
                        >
                            Reveal Answer
                        </Button>
                    ) : (
                        <Button
                            className="text-primary text-2xl md:text-4xl px-0 hover:bg-transparent"
                            disabled={hint.allUsed || riddle?.allSolved}
                            onClick={handleGetHint}
                            variant="ghost"
                        >
                            Get Hint
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
