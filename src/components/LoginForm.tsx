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
import FocusTrap from 'focus-trap-react'
import CloseModal from './CloseModal'

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

    const onSubmit = async (formValues: LoginInputValidator) => {
        console.log('######### client side on submit called: ', formValues)
        try {
            const res = await axios.post('/api/auth/login', formValues)
            console.log('######### res: ', res)
            // if (status === 200) {
            //     toast.success('Logged in successfully')
            //     router.replace('/')
            // } else {
            //     throw new Error(data.error.message)
            //     console.log(data.error.message)
            // }
            // router.push('/')
        } catch (error: any) {
            toast.error(error)
        }
    }

    const handleSwap = () => router.replace('/signup')

    return (
        <FocusTrap>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-3/4 space-y-4 rounded-2xl bg-secondary p-4 text-secondary-foreground"
            >
                <CloseModal />
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
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
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
                            <Button
                                variant="link"
                                onClick={handleSwap}
                                className="text-md"
                            >
                                Go to Sign Up
                            </Button>
                        </h1>
                    </div>
                </Form>
            </form>
        </FocusTrap>
    )
}
