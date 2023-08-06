import '@/styles/globals.css'
import type { Metadata } from 'next'
import Providers from '@/providers'
import Fonts from '@/styles/fonts'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Authenticaion Course',
    description: 'Full featured authentication course',
    keywords: 'authentication, course, react, nextjs',
}

interface Props {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={`${Fonts} w-full bg-slate-100`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
