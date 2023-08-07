// import CloseModal from '@/components/CloseModal'
import CloseModal from '@/components/CloseModal'
import SignUpForm from '@/components/SignUpForm'
import type { FC } from 'react'

const SignUpFormInterceptPage: FC = () => {
    return (
        <div className="fixed inset-0 z-10 bg-zinc-900/30 backdrop-blur-sm">
            <div className="container mx-auto flex h-full max-w-lg items-center">
                <div className="relative h-fit w-full rounded-lg">
                    {/* <div className="absolute right-4 top-4">
                        <CloseModal />
                    </div> */}
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

export default SignUpFormInterceptPage
