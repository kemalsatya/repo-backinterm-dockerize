import mongoose from "mongoose";
import { env } from "@/config/env";

export const connectMongoDB = async () => {
    if(await mongoose.connect(env.mongoUri)){console.log("[LOG] MongoDB connected")}
}