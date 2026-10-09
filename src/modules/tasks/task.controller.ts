import type { Context } from "hono";
import * as service from './task.service'
import * as util from "@/utils/response.util"
import { paramIdSchema } from "@/modules/projects/project.validator";
import { createTaskSchema } from "./task.validator";

export const createTaskHandler = async (c: Context) => {
    try {
        const body = await c.req.json()
        const validatedData = createTaskSchema.parse(body)
        const createdTask = service.createTask(validatedData)
        return util.successResponse(c, createdTask, "Task berhasil dibuat", 201)
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getAllTaskHandler = async (c: Context) => {
    try {
        const allTask = await service.getAllTask()
        return util.successResponse(c, allTask, "Berhasil mengambil semua task")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getSpesificTaskHandler = async (c: Context) => {
    try {
        const {id: idTaskRequested} = paramIdSchema.parse(c.req.param())
        const taskRequested = service.getTaskById(idTaskRequested)
        return util.successResponse(c, taskRequested, "data spesifik task berhasil diambil")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const updateSpesificTaskHandler = async (c: Context) => {
    try {
        const {id: idTaskRequested} = paramIdSchema.parse(c.req.param())
        const validData = await c.req.json()
        const updatedTask = service.updateTaskById(idTaskRequested, validData)
        return util.successResponse(c, updatedTask, "Data task berhasil diperbarui")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const deleteSpesificTaskHandler = async (c:Context) => {
    try {
        const {id: idTaskRequested} = paramIdSchema.parse(c.req.param())
        const deletedTask = service.deleteTaskById(idTaskRequested)
        return util.successResponse(c, deletedTask, "Task telah berhasil dihapus")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}