import React, { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'

const ThemeProvider = dynamic(() => import('./theme-provider'), {
    ssr: false,
})
interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
        </ThemeProvider>
    )
}

export default Providers
