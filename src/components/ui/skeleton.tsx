import { cn } from "@/lib/cn";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white bg-opacity-80 dark:bg-muted",
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
