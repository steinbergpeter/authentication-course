import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '@/components/ModeToggle'
import { buttonVariants } from './ui/button'

const Header = () => {
    return (
        <header className="z-100 fixed top-0 w-full bg-secondary text-secondary-foreground">
            <div className="flex w-full items-center justify-between px-12 py-6">
                <Link href="/" className="text-xl font-semibold">
                    Logo
                </Link>

                <div className="flex justify-between gap-8">
                    <Link className={buttonVariants()} href="/login">
                        Log In
                    </Link>
                    {/* <ModeToggle /> */}
                </div>
            </div>
        </header>
    )
}

export default Header
