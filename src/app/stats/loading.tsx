import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
    return (
        <div className="flex w-full h-screen flex-col gap-4 ">
            <h1 className="text-4xl font-bold">Stats</h1>
            <Skeleton className="h-14 w-[250px]" />{" "}
            <div className="flex flex-col md:flex-row gap-4 ">
                <Skeleton className="w-full h-44" />
                <Skeleton className="w-full h-44" />
                <Skeleton className="w-full h-44" />
            </div>
            <div className="flex flex-col md:flex-row gap-4 ">
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
            </div>
            <Skeleton className="w-full h-full" />
        </div>
    );
};

export default loading;
