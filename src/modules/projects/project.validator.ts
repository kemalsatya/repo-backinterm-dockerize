import z from "zod";

const projectSchema = z.object({
    projectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Format ID MongoDB tidak valid"),
    name: z.string().min(1, "name wajib diisi"),
    description: z.string().optional()
});

export const createProjectSchema = projectSchema.omit({ projectId: true });
export const updateProjectSchema = createProjectSchema.partial();

export const paramIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Format ID MongoDB tidak valid")
});

export type createProjectDTO = z.infer<typeof createProjectSchema>
export type updateProjectDTO = z.infer<typeof updateProjectSchema>