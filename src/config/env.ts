export const env = {
    port: Number(Bun.env.PORT) || 3000,
    nodeenv: Bun.env.NODE_ENV as string,
    mongoUri: Bun.env.MONGO_URI as string || "",
    mongoDB: Bun.env.MONGO_DB as string || ""
}

if (!env.mongoUri) {
  throw new Error('MONGO_URI is required');
}