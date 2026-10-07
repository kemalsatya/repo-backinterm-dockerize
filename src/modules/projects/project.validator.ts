import z from "zod";

const projectSchema = z.object({
    projectId: z.string(),
    name: z.string().min(1, "name wajib diisi"),
    description: z.string().optional()
});

export const createProjectSchema = projectSchema.omit({ projectId: true });
export const updateProjectSchema = projectSchema.partial();