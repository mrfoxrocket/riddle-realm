import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DB_CONNECTION_STRING!);

export default db;
