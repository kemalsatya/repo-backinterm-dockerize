import { Hono } from 'hono'
import router from '@/routes'

const app = new Hono()

// Mount routes
app.get("/", (c) => c.text("berhasil"))

app.route("/api", router)

export default app