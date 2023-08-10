import '@/styles/globals.css'
import type { Metadata } from 'next'
import Providers from '@/providers'
import Fonts from '@/styles/fonts'
import type { ReactNode } from 'react'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'Authenticaion Course',
    description: 'Full featured authentication course',
    keywords:
        'authentication, course, react, nextjs, tailwindcss, shadcn, vegan, diet, plant-based, app',
}

interface Props {
    children: ReactNode
    modals?: ReactNode
}

export default function RootLayout({ children, modals }: Props) {
    return (
        <html lang="en">
            <body className={`${Fonts} absolute w-full bg-slate-100`}>
                <Providers>
                    {modals}
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
