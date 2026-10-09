import { Hono } from "hono";
import * as controller from "./task.controller"

const taskRoutes = new Hono()

// get all tasks
taskRoutes.get("/", controller.getAllTaskHandler)

// create a task
taskRoutes.get("/", controller.createTaskHandler)

// get spesific task
taskRoutes.get("/:id", controller.getSpesificTaskHandler)

// update spesific task
taskRoutes.patch("/:id", controller.updateSpesificTaskHandler)

// delete spesific task
taskRoutes.delete("/:id", controller.deleteSpesificTaskHandler)

export default taskRoutes

