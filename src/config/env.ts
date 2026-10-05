export const env = {
    port: Number(Bun.env.PORT) || 3000,
    mongoUri: Bun.env.MONGO_URI || "",
}