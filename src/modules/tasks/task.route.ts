import { Hono } from "hono";
import * as controller from "./task.controller"

const taskRoutes = new Hono()

// get all tasks
taskRoutes.get("/", controller.getAllTaskHandler)

// create a task
taskRoutes.post("/", controller.createTaskHandler)

// get spesific task
taskRoutes.get("/:id", controller.getSpesificTaskHandler)

// update spesific task
taskRoutes.patch("/:id", controller.updateSpesificTaskHandler)

// delete spesific task
taskRoutes.delete("/:id", controller.deleteSpesificTaskHandler)

// assign assignee to task
taskRoutes.patch("/:id/assign", controller.assignSpesificTaskHandler)

export default taskRoutes

