"use client";

import { TabsRadioGroup, TabsRadioTrigger } from "@/components/ui/tabRadio";
import { DifficultySelectProps } from "@/lib/types";

const DifficultySelect = (props: DifficultySelectProps) => {
    const { difficulty, handleDifficultyChange } = props;

    return (
        <div className="self-center flex flex-col items-center gap-6">
            <h3 className="text-4xl font-bold">Select Your Difficulty</h3>
            <TabsRadioGroup
                className="flex gap-2 "
                defaultValue="all"
                value={difficulty}
                onValueChange={handleDifficultyChange}
            >
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white hover:text-blue-500"
                    value="all"
                >
                    All
                </TabsRadioTrigger>
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-white hover:text-primary"
                    value="easy"
                >
                    Easy
                </TabsRadioTrigger>
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white hover:text-orange-500"
                    value="medium"
                >
                    Medium
                </TabsRadioTrigger>
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-red-500 data-[state=checked]:text-white hover:text-red-500"
                    value="hard"
                >
                    Hard
                </TabsRadioTrigger>
            </TabsRadioGroup>
        </div>
    );
};

export default DifficultySelect;
