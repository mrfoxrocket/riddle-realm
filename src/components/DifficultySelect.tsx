"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TabsRadioGroup, TabsRadioTrigger } from "@/components/tabRadio";
import { useState } from "react";

const DifficultySelect = (props) => {
    const { difficulty, handleDifficultyChange } = props;

    return (
        <div className="self-center">
            <TabsRadioGroup
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
