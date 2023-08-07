'use client'

import axios from 'axios'
import Link from 'next/link'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signupSchema, type SignupInputValidator } from '@/lib/validators'

export default function SignUpForm() {
    const defaultUser = {
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
    }
    const [user, setUser] = useState(defaultUser)
    const [isLoading, setIsLoading] = useState(false)
    const isDisabled = !user.email || !user.password || !user.username
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        if (user.password !== user.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        try {
            const res = await axios.post('/api/auth/signup', user)
            const name = await res.data.savedUser.username
            toast.success(`Welcome, ${name}, log in and get started!`)
            router.push(`/login`)
        } catch (error: any) {
            toast.error(JSON.stringify(error.response))
        } finally {
            setIsLoading(false)
            setUser(defaultUser)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-3/4 space-y-4 bg-slate-200 p-4"
        >
            <h1 className="w-full text-center text-2xl font-semibold text-black">
                {isLoading ? 'Loading...' : 'Sign Up'}
            </h1>
            <hr />
            <div className="flex items-center justify-between">
                <label htmlFor="username">Username</label>
                <input
                    className="ml-4 w-80 rounded-sm px-2 py-1"
                    id="username"
                    type="username"
                    placeholder="username"
                    value={user.username}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-between">
                <label htmlFor="email">Email</label>
                <input
                    className="ml-4 w-80 rounded-sm px-2 py-1"
                    id="email"
                    type="email"
                    placeholder="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-between">
                <label htmlFor="password">Password</label>
                <input
                    className="ml-4 w-80 rounded-sm px-2 py-1"
                    id="password"
                    type="password"
                    placeholder="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-between">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    className="ml-4 w-80 rounded-sm px-2 py-1"
                    id="confirmPassword"
                    type="password"
                    placeholder="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                disabled={isDisabled}
                className="mb-4 w-full rounded-lg border border-gray-300 bg-slate-800 p-2 text-white focus:border-gray-600 focus:outline-none disabled:bg-green-100 disabled:text-green-300"
            >
                Sign Up
            </button>
            <div className="w-full">
                <h1 className="text-center">
                    Already have an account?{' '}
                    <Link
                        className="text-blue-800 hover:text-blue-600"
                        href="./login"
                    >
                        Go to Login
                    </Link>
                </h1>
            </div>
        </form>
    )
}
