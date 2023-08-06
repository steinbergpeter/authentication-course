'use client'

import React, { type ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return <div>{children}</div>
}

export default Providers
