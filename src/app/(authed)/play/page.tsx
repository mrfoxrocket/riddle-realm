"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getRandomRiddle } from "@/actions/riddles";
import RiddleForm from "@/components/RiddleForm";

type Riddle = {
    id: string;
    question: string;
    answer: string;
};

function Play() {
    const [riddle, setRiddle] = useState<Riddle | null>(null);

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
        } catch (error) {
            console.error("Error fetching new riddle:", error);
        }
    };

    return (
        <div>
            <h1>Solve a Riddle</h1>
            <h2>
                {riddle ? (
                    riddle.question + riddle.answer
                ) : (
                    <Loader2 className="animate-spin size-16" />
                )}
            </h2>
            {riddle && <RiddleForm riddleId={riddle.id} />}
            <Button onClick={handleNewRiddle}>New Riddle</Button>
        </div>
    );
}

export default Play;
