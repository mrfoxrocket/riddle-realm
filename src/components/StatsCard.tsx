import { WobbleCard } from "./ui/wobble-card";
import { cn } from "@/lib/utils";

type Props = {
    title: string;
    stat: number | string;
    className?: string;
    containerClassName?: string;
};

const StatsCard = (props: Props) => {
    const { title, stat, className, containerClassName } = props;

    return (
        <WobbleCard
            containerClassName={cn("h-full ", containerClassName)}
            className={cn(
                "w-full text-center flex flex-col items-center",
                className
            )}
        >
            <h4 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {title}
            </h4>
            <p className="mt-4 text-left  text-5xl text-neutral-200">{stat}</p>
        </WobbleCard>
    );
};

export default StatsCard;
