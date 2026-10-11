import { projectModel } from "./project.model"
import type { createProjectDTO, updateProjectDTO } from "./project.validator"

export const createProject = async (newProjectData: createProjectDTO) => {
    const project = await projectModel.create(newProjectData)
    return project
}

export const getAllProjects = async (page: number = 1, limit: number = 10) => {
    const skip = (page-1) * limit
    const [project, totalItems] = await Promise.all([
        projectModel.find().skip(skip).limit(limit).lean(),
        projectModel.countDocuments()
    ])
    const totalPages = Math.ceil(totalItems / limit)
    return {project, totalItems, totalPages, currentPage: page, limit}
}

export const getProjectById = async (projectId: string) => {
    const project = await projectModel.findById(projectId).lean();
    if(!project) throw new Error("Project tidak tersedia sejak awal", {cause: {status: 404}})
    return project 
}

export const deleteProjectById = async (projectId: string) => {
    const deletedProject = await projectModel.findByIdAndDelete(projectId).lean();
    if (!deletedProject) {
        throw new Error("Project tidak tersedia sejak awal", {cause: {status: 404}})
    }
    return deletedProject
}

export const updateProjectById = async (projectId: string, data: updateProjectDTO) => {
    const updatedProject = await projectModel.findByIdAndUpdate(projectId, data, {returnDocument: 'after'})
    if (!updatedProject){ throw new Error("Project tidak tersedia", {cause: {status: 404}})}
    return updatedProject
}