import * as z from 'zod'

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Must be at least three characters')
            .max(20, 'Twenty characters or less'),
        email: z.string().email(),
        password: z
            .string()
            .min(5, 'Must be at least five characters')
            .max(20, 'Twenty characters or less'),
        passwordConfirmation: z
            .string()
            .min(5, 'Must be at least five characters')
            .max(20, 'Twenty characters or less'),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    })

export type SignupInputValidator = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(5, 'Must be at least five characters')
        .max(20, 'Twenty characters or less'),
})

export type LoginInputValidator = z.infer<typeof loginSchema>
