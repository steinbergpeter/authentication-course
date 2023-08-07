'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { type FC } from 'react'

const CloseModal: FC = () => {
    const router = useRouter()
    const closeModal = () => router.back()

    return (
        <Button
            variant="ghost"
            className="h-6 w-6 rounded-md p-0"
            aria-label="close sign-in modal"
            onClick={closeModal}
        >
            <X className="h-4 w-4" />
        </Button>
    )
}

export default CloseModal
