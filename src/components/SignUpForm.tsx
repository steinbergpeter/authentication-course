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
import CloseModal from './CloseModal'

import { signupSchema, type SignupInputValidator } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { suggestPassword } from '@/lib/passwordGenerator'
import FocusTrap from 'focus-trap-react'

export default function SignUpForm() {
    //
    const router = useRouter()

    const defaultValues = {
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
    }

    const form = useForm<SignupInputValidator>({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
        progressive: true,
        defaultValues,
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = form

    const onSubmit = async (formValues: SignupInputValidator) => {
        try {
            const res = await axios.post('/api/auth/signup', formValues)
            const name = await res.data.savedUser.fullName
            toast.success(`Welcome, ${name}, log in to get started!`)
            router.push(`/login`)
        } catch (error: any) {
            toast.error(JSON.stringify(error.response))
        }
    }

    const handleSwap = () => router.replace('/login')

    return (
        <FocusTrap>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mx-auto w-3/4 space-y-4 rounded-2xl bg-secondary p-4 text-secondary-foreground"
            >
                <CloseModal />
                <Form {...form}>
                    <h1 className="text-center text-xl font-semibold">
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </h1>
                    <FormField
                        control={control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="fullName">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="full name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                <div className="flex items-center justify-between">
                                    <FormLabel htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <Button
                                        onClick={suggestPassword}
                                        type="button"
                                        variant={'link'}
                                    >
                                        Suggest Password
                                    </Button>
                                </div>
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

                    <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="confirm password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="focus: w-full bg-primary text-primary-foreground hover:bg-primary/50 focus:bg-green-700 focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-800 disabled:bg-slate-300"
                        disabled={!isValid || isSubmitting}
                    >
                        Submit
                    </Button>

                    <div className="w-full">
                        <h1 className="text-center">
                            Already have an account?{' '}
                            <Button
                                variant="link"
                                onClick={handleSwap}
                                className="text-md"
                            >
                                Go to Login
                            </Button>
                        </h1>
                    </div>
                </Form>
            </form>
        </FocusTrap>
    )
}
