import type { Context } from 'hono'
import * as service from './project.service'
import * as util from "@/utils/response.util"
import { createProjectSchema, updateProjectSchema, paramIdSchema } from './project.validator'
import { paginationQuerySchema } from '@/utils/pagination.util'
import { paginationLinks } from '@/utils/response.util'

import { link } from '@/utils/hateoas.util'

const projectLinks = (projectId: string) => [
    link.self(`/api/projects/${projectId}`),
    link.update(`/api/projects/${projectId}`),
    link.delete(`/api/projects/${projectId}`),
    link.collection('/api/projects')
]

export const createProjectHandler = async (c: Context) => {
    try {
        const body = await c.req.json()
        const validatedData = createProjectSchema.parse(body)
        const createdProject = await service.createProject(validatedData)
        return util.successResponseHT(c, createdProject, projectLinks(createdProject.id), "Project berhasil dibuat", 201)
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getAllProjectsHandler = async (c: Context) => {
    try {
        const { page, limit } = paginationQuerySchema.parse(c.req.query())
        const allProjects = await service.getAllProjects(page, limit)
        const links = paginationLinks(allProjects.currentPage, allProjects.limit, allProjects.totalPages, "projects")
        return util.successResponseHTPaginated(c, allProjects.project, {page: allProjects.currentPage, limit: allProjects.limit, totalItems: allProjects.totalItems, totalPages: allProjects.totalPages},links, "Berhasil mengambil semua project")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getSpecificProjectHandler = async (c: Context) => {
    try {
        const {id: idProjectRequested} = paramIdSchema.parse(c.req.param())

        const projectRequested = await service.getProjectById(idProjectRequested)
        return util.successResponseHT(c, projectRequested, projectLinks(projectRequested._id.toString()), "Data project berhasil diambil")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}

export const updateProjectHandler = async (c: Context) => {
    try {
        const {id: idProjectUpdated} = paramIdSchema.parse(c.req.param())
        const body = await c.req.json()
        const validData = updateProjectSchema.parse(body)
        const updatedProject = await service.updateProjectById(idProjectUpdated, validData)
        return util.successResponseHT(c, updatedProject, projectLinks(updatedProject.id), "Project berhasil diupdate")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}

export const deleteSpecificProjectHandler = async (c: Context) => {
    try {
        const {id: idProjectRequested} = paramIdSchema.parse(c.req.param())
        const deletedProject = await service.deleteProjectById(idProjectRequested)
        return util.successResponseHT(c, deletedProject, projectLinks(deletedProject._id.toString()), "Project berhasil dihapus")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}