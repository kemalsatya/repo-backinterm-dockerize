import z from "zod";

export interface paginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10)
})

export type paginationQuery = z.infer<typeof paginationQuerySchema>