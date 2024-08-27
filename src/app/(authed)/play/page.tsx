"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getHints, getRandomRiddle, getAnswer } from "@/actions/riddles";
import RiddleForm from "@/components/RiddleForm";

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
        <div className="flex flex-col gap-4">
            <h1>Solve a Riddle</h1>
            <h2>
                {riddle ? (
                    riddle.question + riddle.answer
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
            <p>{answer !== "" ? answer : hint.text}</p>
            <Button onClick={handleNewRiddle}>New Riddle</Button>
            {hint.allUsed ? (
                <Button disabled={answer !== ""} onClick={handleGetAnswer}>
                    Reveal Answer
                </Button>
            ) : (
                <Button disabled={hint.allUsed} onClick={handleGetHint}>
                    Get Hint
                </Button>
            )}
        </div>
    );
}

export default Play;
