import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {
    title: string;
    stat: number | string;
};

const StatsCard = (props: Props) => {
    const { title, stat } = props;

    return (
        <Card className="flex flex-col items-center w-full py-4 text-center ">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-5xl">{stat}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
