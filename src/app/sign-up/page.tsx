"use client";

import { useState } from "react";

import { Riddle } from "@/lib/types";
import getExampleRiddle from "@/lib/exampleRiddles";
import getRandomHeading from "@/lib/headings";
import { getHints, getSignUpRiddle } from "@/actions/riddles";

import BottomText from "@/components/BottomText";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/SignUpForm";

import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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
        <div className="flex flex-col justify-between py-20 flex-1 ">
            <div className="flex flex-col lg:flex-row text-center lg:text-start gap-y-14 lg:gap-x-36 items-center lg:items-start">
                <div className="flex flex-1 flex-col gap-10 text-4xl mx-auto font-normal text-neutral-400 justify-between py-6 lg:self-start  ">
                    <h2 className="font-bold text-5xl max-w-[900px] text-green-500">
                        {heading}
                    </h2>
                    <div className="flex  flex-1 justify-center lg:justify-start ">
                        {!riddle ? (
                            <TextGenerateEffect
                                key={exampleRiddle}
                                className="max-w-[600px] font-normal text-neutral-400  text-4xl"
                                duration={1}
                                filter={false}
                                words={exampleRiddle}
                            />
                        ) : (
                            riddle &&
                            riddle.question && (
                                <TextGenerateEffect
                                    key={riddle.id}
                                    className="max-w-[600px] font-normal text-neutral-400  text-4xl  "
                                    duration={1}
                                    filter={false}
                                    words={riddle.question}
                                />
                            )
                        )}
                    </div>
                    <div className=" flex justify-center lg:justify-end min-h-16 items-center">
                        {!riddle ? (
                            <FlipWords
                                words={usernames}
                                duration={5000}
                                className="font-bold text-neutral-400 "
                            />
                        ) : (
                            riddle &&
                            riddle.question && (
                                <div className="text-2xl text-primary text-center">
                                    <TextGenerateEffect
                                        key={hint.text}
                                        className="max-w-[600px] font-normal text-primary animate-slow-pulse "
                                        duration={1}
                                        filter={false}
                                        words={hint.text}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="lg:hidden  flex justify-start md:justify-center min-h-16 items-center">
                    {!riddle ? (
                        <p className="text-4xl">
                            Ready to Try for Yourself?
                            <Button
                                className="text-primary font-semibold text-4xl hover:bg-transparent px-4"
                                variant="ghost"
                                onClick={() => handleNewRiddle()}
                            >
                                Click Here
                            </Button>
                            to Generate a New Riddle
                        </p>
                    ) : (
                        riddle &&
                        riddle.question && (
                            <BottomText
                                className=""
                                hintAllUsed={hint.allUsed}
                                handleNewRiddle={handleNewRiddle}
                                handleGetHint={handleGetHint}
                                answerDisabled={true}
                            />
                        )
                    )}
                </div>
                <SignUpForm riddleId={riddle?.id || ""} hintsUsed={hint.index} />
            </div>
            <div className="hidden lg:flex justify-start md:justify-center min-h-16 items-center">
                {!riddle ? (
                    <p className="text-4xl ">
                        Ready to Try for Yourself?
                        <Button
                            className="text-primary font-semibold text-4xl hover:bg-transparent px-4 animate-bounce "
                            variant="ghost"
                            onClick={() => handleNewRiddle()}
                        >
                            Click Here
                        </Button>
                        to Generate a New Riddle
                    </p>
                ) : (
                    riddle &&
                    riddle.question && (
                        <BottomText
                            className=""
                            hintAllUsed={hint.allUsed}
                            handleNewRiddle={handleNewRiddle}
                            handleGetHint={handleGetHint}
                            answerDisabled={true}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Page;
