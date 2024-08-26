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

import toast from "react-hot-toast";
import { useTransition } from "react";
import { checkRiddleAnswer } from "@/actions/riddles";

const RiddleForm = (props) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm();

    const { riddleId } = props;

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const response = await checkRiddleAnswer(formData);

            if (response) {
                toast.success("Correct!");
            } else {
                toast.error("Incorrect!");
            }
        });
    };

    return (
        <Form {...form}>
            <form action={handleSubmit} className="space-y-8">
                <input hidden value={riddleId} name="id" />
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
