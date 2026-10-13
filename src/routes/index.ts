import { Hono } from "hono"
import projectRoutes from "@/modules/projects/project.route"
import taskRoutes from "@/modules/tasks/task.route"
import userRoutes from "@/modules/users/users.route" 

const router = new Hono()

// module routes
router.route("/projects", projectRoutes)
router.route("/tasks", taskRoutes)
router.route("/users", userRoutes)

export default router