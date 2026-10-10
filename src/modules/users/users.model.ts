import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String
})
export const userModel = mongoose.model('User', userSchema)