import mongoose from "mongoose";
import { env } from "@/config/env";

export const connectMongoDB = async () => {
    await mongoose.connect(env.mongoUri)
}