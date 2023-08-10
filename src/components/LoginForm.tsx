'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { loginSchema, type LoginInputValidator } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function LoginForm() {
    const router = useRouter()

    const form = useForm<LoginInputValidator>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        progressive: true,
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = form

    const onSubmit = async (values: LoginInputValidator) => {
        console.log(values)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-3/4 space-y-4 rounded-2xl bg-secondary p-4 text-secondary-foreground"
        >
            <Form {...form}>
                <h1 className="text-center text-xl font-semibold">
                    {isSubmitting ? 'Submitting...' : 'Login'}
                </h1>
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="password"
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:opacity-75 focus:ring-2 focus:ring-secondary focus:ring-offset-2  disabled:bg-slate-300"
                    disabled={!isValid || isSubmitting}
                >
                    Submit
                </Button>

                <div className="w-full">
                    <h1 className="text-center">
                        Need to set up an account?{' '}
                        <Link
                            className="text-blue-800 hover:text-blue-600"
                            href="./signup"
                        >
                            Go to Sign Up
                        </Link>
                    </h1>
                </div>
            </Form>
        </form>
    )
}
