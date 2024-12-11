import { Riddle } from "@/lib/types";
import { TextGenerateEffect } from "./ui/text-generate-effect";
const RiddleText = ({
    riddle,
    difficulty,
}: {
    riddle: Riddle;
    difficulty: string;
}) => {
    return (
        <h4 className="text-3xl flex w-full p-4 justify-center text-center ">
            {!riddle?.allSolved && (
                <TextGenerateEffect
                    key={riddle.question}
                    className="max-w-[600px] font-normal text-neutral-400 text-3xl text-center "
                    duration={1}
                    filter={false}
                    words={riddle.question ?? ""}
                />
            )}
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
        </h4>
    );
};

export default RiddleText;
