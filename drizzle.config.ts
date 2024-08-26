import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schemas.ts",
    out: "./src/db/migrations/drizzle",
});
