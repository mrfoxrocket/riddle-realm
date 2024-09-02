"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

// TabsRadioGroup Root Component
const TabsRadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center  rounded-md backdrop-blur-sm bg-white/40  border-primary p-2  text-muted-foreground flex-wrap",
            className
        )}
        {...props}
    />
));
TabsRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// TabsRadioGroup Trigger Component
const TabsRadioTrigger = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-1.5  text-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  data-[state=checked]:shadow-sm dark:text-white ",
            className
        )}
        {...props}
    >
        {children}
    </RadioGroupPrimitive.Item>
));
TabsRadioTrigger.displayName = RadioGroupPrimitive.Item.displayName;

export { TabsRadioGroup, TabsRadioTrigger };
