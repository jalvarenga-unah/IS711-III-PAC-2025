import * as z from 'zod'

const todoSchema = z.object({
    title: z.string().min(5).max(50),
    description: z.string().max(100).nullable(),
    completed: z.boolean().default(false)
}).strict()

export const validatetodo = (todo) => {
    return todoSchema.safeParse(todo)
}