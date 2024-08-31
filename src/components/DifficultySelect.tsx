"use client";

import { TabsRadioGroup, TabsRadioTrigger } from "@/components/ui/tabRadio";
import { DifficultySelectProps } from "@/lib/types";

const DifficultySelect = (props: DifficultySelectProps) => {
    const { difficulty, handleDifficultyChange } = props;

    return (
        <div className="self-center">
            <TabsRadioGroup
                className="flex gap-2"
                defaultValue="all"
                value={difficulty}
                onValueChange={handleDifficultyChange}
            >
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                    value="all"
                >
                    All
                </TabsRadioTrigger>
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
                    value="easy"
                >
                    Easy
                </TabsRadioTrigger>
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                    value="medium"
                >
                    Medium
                </TabsRadioTrigger>
                <TabsRadioTrigger
                    className="data-[state=checked]:bg-red-500 data-[state=checked]:text-white"
                    value="hard"
                >
                    Hard
                </TabsRadioTrigger>
            </TabsRadioGroup>
        </div>
    );
};

export default DifficultySelect;
