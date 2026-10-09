import { projectModel } from "./project.model"
import type { createProjectDTO, updateProjectDTO } from "./project.validator"

export const createProject = async (newProjectData: createProjectDTO) => {
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
    const deletedProject = await projectModel.findByIdAndDelete(projectId).lean();
    if (!deletedProject

    ) {
        throw new Error("Project tidak tersedia sejak awal")
    }
    return deletedProject
}

export const updateProjectById = async (projectId: string, data: updateProjectDTO) => {
    const updatedProject = await projectModel.findByIdAndUpdate(projectId, data, {new: true})
    if (!updatedProject){ throw new Error("Project tidak tersedia")}
    return updatedProject
}