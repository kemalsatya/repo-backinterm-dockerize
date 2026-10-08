import mongoose, { Schema, model } from 'mongoose';
import type { nullable } from 'zod';

const projectSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String },
    status: {
        type: String,
        enum: ["active", "inactive", "archive"],
        default: "active"
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }    
)

export const projectModel = mongoose.model('Project', projectSchema)