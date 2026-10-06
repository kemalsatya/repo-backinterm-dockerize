import app from "@/app";
import { env } from "@/config/env";
import { connectMongoDB } from "@/db/mongoose";

await connectMongoDB()

Bun.serve({
    fetch: app.fetch,
    port: env.port,
})