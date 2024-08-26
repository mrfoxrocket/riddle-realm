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
            <form action={handleSubmit} className="space-y-8">
                <FormField
                    control={form.control}
                    disabled={isPending}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Input placeholder="Text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit">
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
