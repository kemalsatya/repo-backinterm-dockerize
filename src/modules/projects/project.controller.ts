import mongoose from "mongoose"
import { projectModel } from "./project.model"

const createProject = async (newProjectData: object) => {
    const project = await projectModel.create(newProjectData)
    return project
}

const getAllProjects = async () => {
    const projects = await projectModel.find();
    return projects
}

const getProjectById = async (projectId: string) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Format ID tidak valid")
    }

    const project = await projectModel.findById(projectId);
    return project 
}

const deleteProjectById = async (projectId: string) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Format ID tidak valid")
    }

    const projectDeleted = await projectModel.findByIdAndDelete(projectId);
    if (!projectDeleted) {
      throw new Error("Project tidak tersedia sejak awal")
    }
}

const updateProjectById = async (projectId: string) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Format ID tidak valid")
    }

    const projectUpdated = await projectModel.findByIdAndUpdate(projectId, {new: true})
    if (!projectUpdated){ throw new Error("Project tidak tersedia")}
}