import LoginForm from '@/components/LoginForm'
import type { FC } from 'react'

const LoginFormInterceptPage: FC = () => {
    return (
        <div className="fixed inset-0 z-10 bg-zinc-900/30 backdrop-blur-sm">
            <div className="mx-auto flex h-full items-center justify-center">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginFormInterceptPage
