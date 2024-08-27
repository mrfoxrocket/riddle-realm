"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getHints, getRandomRiddle, getAnswer } from "@/actions/riddles";
import RiddleForm from "@/components/RiddleForm";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import DifficultySelect from "@/components/DifficultySelect";

type Riddle = {
    id: string;
    question: string;
    answer: string;
};

function Play() {
    const [riddle, setRiddle] = useState<Riddle | null>(null);
    const [answer, setAnswer] = useState("");
    const [hint, setHint] = useState({
        text: "",
        index: 0,
        allUsed: false,
    });

    useEffect(() => {
        const fetchRiddle = async () => {
            try {
                const response = await getRandomRiddle();

                setRiddle(response);
            } catch (error) {
                console.error("Error fetching riddle:", error);
            }
        };

        fetchRiddle();
    }, []);

    const handleNewRiddle = async () => {
        try {
            const response = await getRandomRiddle();
            setRiddle(response);
            setAnswer("");

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
        <div className="flex flex-col gap-8 w-full items-center">
            <h1 className="text-4xl font-bold self-center">Solve a Riddle</h1>
            <DifficultySelect />
            <h2 className="text-3xl">
                {riddle ? (
                    <TextGenerateEffect
                        key={riddle.question}
                        className="max-w-[600px] font-normal text-neutral-600 dark:text-neutral-400  text-4xl "
                        duration={1}
                        filter={false}
                        words={riddle.question}
                    />
                ) : (
                    <Loader2 className="animate-spin size-16" />
                )}
            </h2>
            {riddle && (
                <RiddleForm
                    riddleId={riddle.id}
                    hintsUsed={hint.index}
                    answerShown={answer !== ""}
                />
            )}
            <p className="text-2xl text-primary">
                {answer !== "" ? answer : hint.text}
            </p>
            <div className="flex gap-4 w-full justify-evenly">
                <div className="flex gap-4 items-center text-4xl">
                    <p>Stuck?</p>

                    <Button
                        variant="custom"
                        size="md"
                        disabled={answer !== ""}
                        onClick={handleNewRiddle}
                    >
                        Generate
                    </Button>

                    <p>a New Riddle.</p>
                    <p>Or</p>
                    {hint.allUsed ? (
                        <Button
                            disabled={answer !== ""}
                            onClick={handleGetAnswer}
                            variant="custom"
                            size="md"
                        >
                            Reveal Answer
                        </Button>
                    ) : (
                        <Button
                            disabled={hint.allUsed}
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
