import CloseModal from '@/components/CloseModal'
import SignUpForm from '@/components/SignUpForm'
import type { FC } from 'react'

const SignUpFormInterceptPage: FC = () => {
    return (
        <div className="fixed inset-0 z-10 bg-zinc-900/30 backdrop-blur-sm">
            <div className="mx-auto flex h-full items-center justify-center">
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUpFormInterceptPage
