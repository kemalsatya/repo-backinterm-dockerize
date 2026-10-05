import app from "@/app";
import { env } from "@/config/env";

Bun.serve({
    fetch: app.fetch,
    port: env.port,
})