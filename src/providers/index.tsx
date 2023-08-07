'use client'

import React, { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <div>
            {children}
            <Toaster />
        </div>
    )
}

export default Providers
