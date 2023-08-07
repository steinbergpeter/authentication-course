import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="z-100 fixed w-full bg-slate-200 shadow-md">
            <div className="flex w-full items-center justify-between px-12 py-6">
                <Link href="/" className="text-xl font-semibold">
                    Logo
                </Link>
                <nav className="flex gap-8 font-semibold">
                    <Link href="/login">Log In</Link>
                    <Link href="/signup">Sign Up</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
