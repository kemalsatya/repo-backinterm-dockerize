import { Hono } from "hono"
import projectRoutes from "@/modules/projects/project.route"
import taskRoutes from "@/modules/tasks/task.route"

const router = new Hono()

router.get("/", (c)=>c.text('halo, server berjalan ya'))

// module routes
router.route("/projects", projectRoutes)
router.route("/task", taskRoutes)

export default router