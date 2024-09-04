"use client";

import Confetti from "react-dom-confetti";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signUpAction } from "@/actions/user";
import { SignUpFormProps } from "@/lib/types";

const SignUpForm = (props: SignUpFormProps) => {
    const [answerFound, setAnswerFound] = useState(false);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const { riddleId, hintsUsed } = props;

    const schema = z
        .object({
            username: z
                .string()
                .min(3, "Username must be at least 3 characters")
                .max(20, "Username must be less than 20 characters")
                .regex(
                    /^(?!.*([_.])\1)[a-zA-Z0-9._]+$/,
                    "Username must only contain letters, numbers, and non-consecutive underscores or dots"
                ),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters"),
            confirmPassword: z
                .string()
                .min(8, "Password must be at least 8 characters"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: {
        username: string;
        password: string;
        confirmPassword: string;
    }) => {
        startTransition(async () => {
            try {
                const result = await signUpAction(data, riddleId, hintsUsed);

                if (typeof result === "object") {
                    form.setError("username", {
                        type: "manual",
                        message: result.errorMessage,
                    });
                } else {
                    setAnswerFound(true);
                    router.replace("/");
                }
            } catch (err) {
                console.error(err);
            }
        });
    };

    return (
        <Form {...form}>
            <form
                className="h-full items-center flex "
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Card className="w-full  sm:w-96 bg-transparent border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-4xl">
                            Create your account
                        </CardTitle>

                        <CardDescription className="text-xl">
                            Make sure to add the answer to the riddle in your
                            username otherwise... You Shall Not Pass!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid ">
                        <FormField
                            name="username"
                            disabled={isPending}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Confetti
                                        active={answerFound}
                                        config={{
                                            angle: 360,
                                            spread: 360,
                                            startVelocity: 80,
                                            elementCount: 138,
                                            dragFriction: 0.15,
                                            duration: 5500,
                                            stagger: 3,
                                            width: "15px",
                                            height: "24px",
                                            colors: [
                                                "#88D969",
                                                "#46CB18",
                                                "#06A10B",
                                                "#1D800E",
                                                "#2BAB27",
                                            ],
                                        }}
                                    />
                                    <FormLabel className="hidden">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {answerFound && (
                                        <p className="text-green-500 font-semibold">
                                            Congratulations you solved the
                                            riddle!
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            disabled={isPending}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="hidden">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            disabled={isPending}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="hidden">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className=""
                                            type="password"
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <div className="grid w-full gap-y-4">
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="text-xl font-bold"
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
                            <Button variant="link" size="sm" asChild>
                                <Link href="/sign-in">
                                    Already have an account? Sign in
                                </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default SignUpForm;
