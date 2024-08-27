"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { useTransition } from "react";
import { checkRiddleAnswer } from "@/actions/riddles";

type Props = {
    riddleId: string;
    hintsUsed: number;
    answerShown: boolean;
};
const RiddleForm = (props: Props) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm();

    const { riddleId, hintsUsed, answerShown } = props;

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            await checkRiddleAnswer(formData, riddleId, hintsUsed, answerShown);
        });
    };

    return (
        <Form {...form}>
            <form
                action={handleSubmit}
                className="space-y-8 flex w-full gap-4 justify-between items-end"
            >
                <FormField
                    control={form.control}
                    disabled={isPending}
                    name="text"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel hidden>Riddle Input</FormLabel>
                            <FormControl>
                                <input
                                    placeholder="Answer"
                                    {...field}
                                    className="w-full bg-transparent  border-b-4 pb-2 outline-none text-2xl "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="custom"
                    size="lg"
                    disabled={isPending}
                    type="submit"
                    className="h-full"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default RiddleForm;
