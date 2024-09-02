"use client";

import { CenterInputProps } from "@/lib/types";
import React, { useState } from "react";

const CenterInput = (props: CenterInputProps) => {
    const { inputValue, handleInputChange } = props;

    return (
        <div className="flex justify-center items-center w-full p-4">
            <div className="relative justify-center items-center w-full text-center ">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Answer Here..."
                    className={`w-full bg-transparent placeholder-black/50 dark:placeholder-muted-foreground text-center text-2xl pb-2 font-medium outline-none z-10 relative ${
                        inputValue === ""
                            ? "border-b-4 border-black/50 dark:border-muted-foreground"
                            : "border-none"
                    }`}
                />
                <span
                    className="absolute left-0 right-0 mx-auto bottom-0 border-b-4 border-primary transition-all duration-100 ease-in-out pointer-events-none"
                    style={{
                        width: `${
                            inputValue.length > 0 ? inputValue.length + 5 : 0
                        }ch`,
                    }}
                ></span>
            </div>
        </div>
    );
};

export default CenterInput;
