import { Hono } from 'hono'
import { Scalar } from '@scalar/hono-api-reference'
import router from '@/routes'
import openApiSpec from '@/docs/openapi.json'

const app = new Hono()

app.get("/health", (c) => c.json({ success: true, message: "endpoint berhasil diakses"}))

// Scalar API Reference documentation & OpenAPI spec
app.get("/openapi.json", (c) => c.json(openApiSpec))
app.route("/docs", Scalar.serve({ document: openApiSpec }))
app.get("/reference", (c) => c.redirect("/docs"))

app.route("/api", router)

export default app