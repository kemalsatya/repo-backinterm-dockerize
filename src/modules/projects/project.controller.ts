import type { Context } from 'hono'
import * as service from './project.service'
import * as util from "@/utils/response.util"
import { createProjectSchema, updateProjectSchema, paramIdSchema } from './project.validator'

export const createProjectHandler = async (c: Context) => {
    try {
        const body = await c.req.json()
        const validatedData = createProjectSchema.parse(body)
        const createdProject = await service.createProject(validatedData)
        return util.successResponse(c, createdProject, "Project berhasil dibuat", 201)
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getAllProjectsHandler = async (c: Context) => {
    try {
        const allProjects = await service.getAllProjects()
        return util.successResponse(c, allProjects, "Berhasil mengambil data project")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getSpecificProjectHandler = async (c: Context) => {
    try {
        const {id: idProjectRequested} = paramIdSchema.parse(c.req.param())

        const projectRequested = service.getProjectById(idProjectRequested)
        return util.successResponse(c, projectRequested,"data spesifik project berhasil diambil")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const updateProjectHandler = async (c: Context) => {
    try {
        const {id: idProjectUpdated} = paramIdSchema.parse(c.req.param())
        const body = await c.req.json()
        const validData = updateProjectSchema.parse(body)
        const updatedProject = service.updateProjectById(idProjectUpdated, validData)
        return util.successResponse(c, updatedProject, "data project berhasil diupdate")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const deleteSpecificProjectHandler = async (c: Context) => {
    try {
        const {id: idProjectRequested} = paramIdSchema.parse(c.req.param())
        const deletedProject = await service.deleteProjectById(idProjectRequested)
        return util.successResponse(c, deletedProject, "project telah berhasil dihapus")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}