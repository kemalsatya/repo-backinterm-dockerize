import { env } from "@/config/env";
import { connectMongoDB } from "@/db/mongoose";
import app from "@/app";

await connectMongoDB();

console.log(`[LOG] Server is running at port ${env.port}`);

Bun.serve({
    fetch: app.fetch,
    port: env.port
});