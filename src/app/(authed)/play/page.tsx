"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getHints, getRandomRiddle, getAnswer } from "@/actions/riddles";
import RiddleForm from "@/components/RiddleForm";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import DifficultySelect from "@/components/DifficultySelect";
import { Riddle } from "@/actions/riddles";

function Play() {
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

    const handleInputChange = (e) => {
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
        try {
            const hints = await getHints(riddle?.id);

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
            setAnswer(await getAnswer(riddle?.id));
        } catch (error) {
            console.error("Error fetching answer:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full items-center  ">
            <h1 className="text-4xl font-bold self-center">Solve a Riddle</h1>

            <DifficultySelect
                difficulty={difficulty}
                handleDifficultyChange={handleDifficultyChange}
            />

            {/* Riddle */}
            <h2 className="text-3xl  p-4 ">
                {!riddle?.allSolved &&
                    (riddle ? (
                        <TextGenerateEffect
                            key={riddle.question}
                            className="max-w-[600px] font-normal text-neutral-600 dark:text-neutral-400 text-3xl text-center "
                            duration={1}
                            filter={false}
                            words={riddle.question}
                        />
                    ) : (
                        <Loader2 className="animate-spin size-16" />
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
            {riddle && !riddle.allSolved && (
                <RiddleForm
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    riddleId={riddle.id}
                    hintsUsed={hint.index}
                    answerShown={answer !== ""}
                />
            )}

            {/* // Stuck? Generate a New Riddle. Or Get Hint */}
            <div className="flex gap-4 w-full justify-evenly">
                <div className="flex gap-4 items-center text-4xl">
                    <p>Stuck?</p>

                    <Button
                        variant="custom"
                        size="md"
                        disabled={answer !== "" || riddle?.allSolved}
                        onClick={() => handleNewRiddle(difficulty)}
                    >
                        Generate
                    </Button>

                    <p>a New Riddle.</p>
                    <p>Or</p>
                    {hint.allUsed ? (
                        <Button
                            disabled={answer !== "" || riddle?.allSolved}
                            onClick={handleGetAnswer}
                            variant="custom"
                            size="md"
                        >
                            Reveal Answer
                        </Button>
                    ) : (
                        <Button
                            disabled={hint.allUsed || riddle?.allSolved}
                            onClick={handleGetHint}
                            variant="custom"
                            size="md"
                        >
                            Get Hint
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Play;
