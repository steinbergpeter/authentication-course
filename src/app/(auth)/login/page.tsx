import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <h1 className="text-2xl font-semibold text-black">Log In</h1>
            <hr />
            <LoginForm />
        </div>
    )
}
