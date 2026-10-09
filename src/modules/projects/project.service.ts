import mongoose from "mongoose"
import { projectModel } from "./project.model"
import type { updateProjectDTO } from "./project.validator"

export const createProject = async (newProjectData: object) => {
    const project = await projectModel.create(newProjectData)
    return project
}

export const getAllProjects = async () => {
    const projects = await projectModel.find().lean();
    return projects
}

export const getProjectById = async (projectId: string) => {
    const project = await projectModel.findById(projectId).lean();
    return project 
}

export const deleteProjectById = async (projectId: string) => {
    const projectDeleted = await projectModel.findByIdAndDelete(projectId).lean();
    if (!projectDeleted) {
        throw new Error("Project tidak tersedia sejak awal")
    }
    return projectDeleted
}

export const updateProjectById = async (projectId: string, data: updateProjectDTO) => {
    const projectUpdated = await projectModel.findByIdAndUpdate(projectId, data, {new: true})
    if (!projectUpdated){ throw new Error("Project tidak tersedia")}
    return projectUpdated
}