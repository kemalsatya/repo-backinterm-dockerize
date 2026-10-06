import { env } from "@/config/env";
import { connectMongoDB } from "@/db/mongoose";
import app from "@/app";

await connectMongoDB();

console.log(`Server is running at http://localhost:${env.port}`);

Bun.serve({
    fetch: app.fetch,
    port: env.port,
});