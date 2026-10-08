import { Hono } from "hono"
import projectRoutes from "@/modules/projects/project.route"

const router = new Hono()

router.get("/", (c)=>c.text('halo, server berjalan ya'))

// module routes
router.route("/projects", projectRoutes)

export default router