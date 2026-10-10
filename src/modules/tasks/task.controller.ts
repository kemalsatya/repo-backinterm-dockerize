import type { Context } from "hono";
import * as service from './task.service'
import * as util from "@/utils/response.util"
import { paramIdSchema } from "@/modules/projects/project.validator";
import { createTaskSchema } from "./task.validator";
import { paginationLinks } from "@/utils/response.util";
import { paginationQuerySchema } from "@/utils/pagination.util";

import { link } from "@/utils/hateoas.util";

const taskLinks = (taskId: string, projectId: string) => [
  link.self(`/api/tasks/${taskId}`),
  link.update(`/api/tasks/${taskId}`),
  link.delete(`/api/tasks/${taskId}`),
  link.collection('/api/tasks'),
  link.rel('project', `/api/projects/${projectId}`), // relasi ke parent project
];


export const createTaskHandler = async (c: Context) => {
    try {
        const body = await c.req.json()
        const validatedData = createTaskSchema.parse(body)
        const createdTask = await service.createTask(validatedData)
        return util.successResponseHT(c, createdTask, taskLinks(createdTask.id, createdTask.projectId.toString()), "Task berhasil dibuat", 201)
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getAllTaskHandler = async (c: Context) => {
    try {
        const { page, limit } = paginationQuerySchema.parse(c.req.query())
        const allTask = await service.getAllTask(page, limit)
        const links = paginationLinks(allTask.currentPage, allTask.limit, allTask.totalPages, "tasks")
        return util.successResponseHTPaginated(c, allTask.tasks, {page: allTask.currentPage, limit: allTask.limit, totalItems: allTask.totalItems, totalPages: allTask.totalPages},links, "Berhasil mengambil semua task")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getSpesificTaskHandler = async (c: Context) => {
    try {
        const {id: idTaskRequested} = paramIdSchema.parse(c.req.param())
        const taskRequested = await service.getTaskById(idTaskRequested)
                
        return util.successResponseHT(c, taskRequested, taskLinks(taskRequested._id.toString(), taskRequested.projectId.toString()), "data spesifik task berhasil diambil")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}

export const updateSpesificTaskHandler = async (c: Context) => {
    try {
        const {id: idTaskRequested} = paramIdSchema.parse(c.req.param())
        const validData = await c.req.json()
        const updatedTask = await service.updateTaskById(idTaskRequested, validData)
        return util.successResponseHT(c, updatedTask, taskLinks(updatedTask.id, updatedTask.projectId.toString()), "Data task berhasil diperbarui")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}

export const deleteSpesificTaskHandler = async (c:Context) => {
    try {
        const {id: idTaskRequested} = paramIdSchema.parse(c.req.param())
        const deletedTask = await service.deleteTaskById(idTaskRequested)
        return util.successResponse(c, deletedTask, "Task telah berhasil dihapus")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}