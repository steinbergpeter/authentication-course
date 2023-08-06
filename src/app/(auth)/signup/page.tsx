import SignUpForm from '@/components/SignUpForm'

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <h1 className="text-2xl font-semibold text-black">Sign Up</h1>
            <hr />
            <SignUpForm />
        </div>
    )
}
