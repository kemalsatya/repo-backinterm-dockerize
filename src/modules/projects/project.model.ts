import mongoose, { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    status: { type: Schema.Types.Union, of: ["active", "archive"], default: "active"}
})

export const projectModel = mongoose.model('Project', projectSchema)