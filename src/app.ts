import { Hono } from 'hono'
import router from '@/routes'

const app = new Hono()

// Mount routes
app.route("/", router)

export default app