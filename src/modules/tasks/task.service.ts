import { taskModel } from "./task.model";
import type { createTaskDTO, updateTaskDTO } from "./task.validator";

export const createTask = async (data: createTaskDTO) => {
    const task = await taskModel.create(data)
    return task
}

export const getAllTask = async () => {
    const tasks = await taskModel.find().lean()
    return tasks
}

export const getTaskById = async (taskId: string) => {
    const task = await taskModel.findById(taskId).lean()
    return task
}

export const deleteTaskById = async (taskId: string) => {
    const deletedTask = await taskModel.findByIdAndDelete(taskId).lean()
    if (!deletedTask) {
        throw new Error("Task tidak tersedia sejak awal")
    }
    return deletedTask
}

export const updateTaskById = async (taskId: string, data: updateTaskDTO) => {
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, data, {new: true})
    if (!updatedTask) throw new Error("Task tidak tersedia")
    return updatedTask
}