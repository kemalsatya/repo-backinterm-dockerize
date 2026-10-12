import { taskModel } from "./task.model";
import type { createTaskDTO, updateTaskDTO } from "./task.validator";

export const createTask = async (data: createTaskDTO) => {
    const task = await taskModel.create(data)
    return task
}

export const getAllTask = async (page: number = 1, limit: number = 10, assignedTo?: string) => {
    const skip = (page-1) * limit
    const filter: Record<string, any> = {}
    if (assignedTo) {
        filter.assignedTo = assignedTo
    }

    const [tasks, totalItems] = await Promise.all([
        taskModel.find(filter).skip(skip).limit(limit).lean(),
        taskModel.countDocuments(filter)
    ])

    const totalPages = Math.ceil(totalItems / limit)
    return {tasks, totalItems, totalPages, currentPage: page, limit}
}

export const getTaskById = async (taskId: string) => {
    const task = await taskModel.findById(taskId).lean()
    if(!task) throw new Error("Task tidak tersedia sejak awal", {cause: {status: 404}})
    return task
}

export const deleteTaskById = async (taskId: string) => {
    const deletedTask = await taskModel.findByIdAndDelete(taskId).lean()
    if (!deletedTask) {
        throw new Error("Task tidak tersedia sejak awal", {cause: {status: 404}})
    }
    return deletedTask
}

export const updateTaskById = async (taskId: string, data: updateTaskDTO) => {
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, data, {returnDocument: 'after'})
    if (!updatedTask) throw new Error("Task tidak tersedia", {cause: {status: 404}})
    return updatedTask
}

export const updateAssignTask = async (taskId: string, userId: string) => {
    const assignedTask = await taskModel.findByIdAndUpdate(taskId, {assignedTo: userId}, {returnDocument: 'after'})
    if (!assignedTask) throw new Error("Task tidak tersedia", {cause: {status: 404}})
    return assignedTask
}