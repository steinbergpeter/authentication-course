'use client'

import axios from 'axios'
import Link from 'next/link'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const defaultUser = { email: '', password: '' }
    const [user, setUser] = useState(defaultUser)
    const isDisabled = !user.email || !user.password
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('change: ', [e.target.id, e.target.value])
        setUser({ ...user, [e.target.id]: e.target.value })
        console.log('user: ', user)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/auth/login', user)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-3/4 space-y-4 bg-slate-200 p-4"
        >
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
            <button
                disabled={isDisabled}
                className="mb-4 w-full rounded-lg border border-gray-300 bg-slate-800 p-2 text-white focus:border-gray-600 focus:outline-none disabled:bg-green-100 disabled:text-green-300"
            >
                Sign Up
            </button>
            <div className="w-full">
                <h1 className="text-center">
                    {`Don\'t have an account yet? `}
                    <Link
                        className="text-blue-800 hover:text-blue-600"
                        href="./signup"
                    >
                        Go to Sign Up
                    </Link>
                </h1>
            </div>
        </form>
    )
}
