"use client";

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

import { useTransition } from "react";
import Link from "next/link";
import { signInAction } from "@/actions/user";

const SignInForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const schema = z.object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be less than 20 characters")
            .regex(
                /^(?!.*([_.])\1)[a-zA-Z0-9._]+$/,
                "Username must only contain letters, numbers, and non-consecutive underscores or dots",
            ),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: { username: string; password: string }) => {
        startTransition(async () => {
            try {
                const result = await signInAction(data);

                if (typeof result === "object") {
                    form.setError("username", {
                        type: "manual",
                        message: result.errorMessage,
                    });
                } else {
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
                className="h-full items-center flex w-full md:max-w-[600px]"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Card className=" w-full bg-transparent border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-4xl">Welcome Back!</CardTitle>

                        <CardDescription className="text-xl">
                            Enter your username and password to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid">
                        <FormField
                            name="username"
                            disabled={isPending}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="hidden">Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            disabled={isPending}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="hidden">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
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
                                    "Enter"
                                )}
                            </Button>
                            <Button variant="link" size="sm" asChild>
                                <Link href="/sign-up">
                                    Don&rsquo;t have an account? Sign up
                                </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default SignInForm;
