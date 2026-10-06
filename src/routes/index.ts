import { Hono } from "hono"
const router = new Hono()

router.get("/", (c)=>c.text('halo'))

export default router