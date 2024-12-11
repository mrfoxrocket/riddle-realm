import { z } from "zod";

export const schema = z.object({
    username: z.string(),
    password: z.string().min(8, "Password should be at least 8 characters"),
});
