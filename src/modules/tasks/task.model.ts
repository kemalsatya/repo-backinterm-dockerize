import mongoose, { Schema } from 'mongoose';

const taskHistorySchema = new Schema({
    field: {type: String, required: true},
    oldValue:  { type: Schema.Types.Mixed },
    newValue:  { type: Schema.Types.Mixed },
    changedAt: {type: Date, default: Date.now }
},
{
    _id: false,
})

const taskSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: { type: String, required: true},
    status: {
        type: String,
        enum: ["todo","in progress","completed"],
        default: 'todo'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    subTask: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
    description: String,
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    tags: String,
    dueDate: Date,
    history: [taskHistorySchema]
}, { timestamps: true } // createdAt + updatedAt
)

export const taskModel = mongoose.model('Task', taskSchema)
