import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String },
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
},
    {
        timestamps: true
    }    
)

export const projectModel = mongoose.model('Project', projectSchema)