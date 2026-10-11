import z from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.email()
})

export const updateUserSchema = userSchema.partial()

export type createUserDTO = z.infer<typeof userSchema>
export type updateUserDTO = z.infer<typeof updateUserSchema>