import * as z from 'zod'

export const signupSchema = z
    .object({
        fullName: z
            .string()
            .min(1, 'Full name is required')
            .min(3, 'Full name must have more than 3 characters')
            .max(100),
        email: z.string().email('Invalid email').min(1, 'Email is required'),
        password: z
            .string()
            .min(1, 'Password is required')
            .regex(
                /^([a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
                'Password must have at least one lowercase letter, one uppercase letter, one number, and one special charcter (@$!%*?&)'
            )
            .min(8, 'Password must have more than 8 characters')
            .max(20, 'Password must have fewer than 20 characters'),

        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type SignupInputValidator = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(5, 'Password must have more than 8 characters')
        .max(20, 'Password must have fewer than 20 characters'),
})

export type LoginInputValidator = z.infer<typeof loginSchema>
