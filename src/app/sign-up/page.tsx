"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import getExampleRiddle from "@/lib/exampleRiddles";
import { FlipWords } from "@/components/ui/flip-words";
import getRandomHeading from "@/lib/headings";
import BottomText from "@/components/BottomText";
import { getHints, getRandomRiddle, getSignUpRiddle } from "@/actions/riddles";
import { useEffect, useState } from "react";
import { Riddle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/SignUpForm";

const Page = () => {
    const [riddle, setRiddle] = useState<Riddle | null>(null);
    const [heading] = useState(getRandomHeading());
    const [{ exampleRiddle, usernames }] = useState(getExampleRiddle());

    const [hint, setHint] = useState({
        text: "",
        index: 0,
        allUsed: false,
    });

    const handleNewRiddle = async () => {
        try {
            const response = await getSignUpRiddle();
            setRiddle(response);
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

    return (
        <div className="  flex flex-1 gap-36 justify-center items-center pb-80 bg-transparent h-full ">
            <div className="flex flex-col gap-10 text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 justify-between py-6">
                <h2 className="font-bold  text-5xl max-w-[900px] text-green-500">
                    {heading}
                </h2>
                {!riddle ? (
                    <>
                        <TextGenerateEffect
                            key={exampleRiddle}
                            className="max-w-[600px] font-normal text-neutral-600 dark:text-neutral-400  text-4xl "
                            duration={1}
                            filter={false}
                            words={exampleRiddle}
                        />
                        <FlipWords
                            words={usernames}
                            duration={5000}
                            className="text-green-500 font-bold self-end"
                        />
                        <p>
                            Ready to Try for Yourself?
                            <Button
                                className="text-primary font-semibold text-2xl md:text-4xl hover:bg-transparent px-4"
                                variant="ghost"
                                onClick={() => handleNewRiddle()}
                            >
                                Click Here
                            </Button>
                            to Generate a New Riddle
                        </p>
                    </>
                ) : (
                    <>
                        {riddle && riddle.question && (
                            <TextGenerateEffect
                                key={riddle.id}
                                className="max-w-[600px] font-normal text-neutral-600 dark:text-neutral-400  text-4xl  "
                                duration={1}
                                filter={false}
                                words={riddle.question}
                            />
                        )}

                        <div className="text-2xl text-primary min-h-16 text-center self-end">
                            <TextGenerateEffect
                                key={hint.text}
                                className="max-w-[600px] font-normal text-primary "
                                duration={1}
                                filter={false}
                                words={hint.text}
                            />
                        </div>

                        <BottomText
                            hintAllUsed={hint.allUsed}
                            handleNewRiddle={handleNewRiddle}
                            handleGetHint={handleGetHint}
                            answerDisabled={true}
                        />
                    </>
                )}
            </div>
            <SignUpForm riddleId={riddle?.id || ""} hintsUsed={hint.index} />
        </div>
    );
};

export default Page;
