import { Hono } from 'hono'
import * as controller from './project.controller'

const projectRoutes = new Hono()

// get all projects
projectRoutes.get("/", controller.getAllProjectsHandler)

// create a project
projectRoutes.post("/", controller.createProjectHandler)

// get spesific project
projectRoutes.get("/:id", controller.getSpecificProjectHandler)

// update spesific project
projectRoutes.patch("/:id", controller.updateProjectHandler)

// delete spesific project
projectRoutes.delete("/:id", controller.deleteSpecificProjectHandler)

export default projectRoutes