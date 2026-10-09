import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String },
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }    
)

export const projectModel = mongoose.model('Project', projectSchema)