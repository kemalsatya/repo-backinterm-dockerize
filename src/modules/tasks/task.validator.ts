import z from "zod";

const taskHistorySchema = z.object({
    field: z.string(),
    oldValue: z.any(),
    newValue: z.any(),
    changedAt: z.date()
})

const taskSchema = z.object({
    projectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Format ID MongoDB tidak valid"),
    taskId: z.string(),
    title: z.string(),
    status: z.enum(["todo", "in progress", "completed"]).default("todo"),
    assignedTo: z.string().regex(/^[0-9a-fA-F]{24}$/, "Format ID MongoDB tidak valid").optional(),
    subTask: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Format ID MongoDB tidak valid")).optional(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
    tags: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    history: taskHistorySchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const assignTaskSchema = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Format ID MongoDB tidak valid")
})

export const createTaskSchema = taskSchema.omit({taskId: true, history: true, createdAt: true, updatedAt: true})
export const updateTaskSchema = createTaskSchema.partial()

export type createTaskDTO = z.infer<typeof createTaskSchema>
export type updateTaskDTO = z.infer<typeof updateTaskSchema>
