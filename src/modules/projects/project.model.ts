import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String },
},
    {
        timestamps: true
    }    
)

export const projectModel = mongoose.model('Project', projectSchema)