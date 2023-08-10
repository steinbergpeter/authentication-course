import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { CopyCheck } from 'lucide-react'

export function generatePassword(length: number): string {
    const regexPattern: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    const characters: string =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&'
    let password: string = ''
    let attempts: number = 0

    while (attempts < 10) {
        for (let i: number = 0; i < length; i++) {
            password += characters.charAt(
                Math.floor(Math.random() * characters.length)
            )
        }

        if (password.match(regexPattern)) {
            return password
        }

        password = ''
        attempts++
    }

    return 'Failed to generate a password, please try again.'
}

export const suggestPassword = () => {
    let res = generatePassword(12)
    const handleCopy = () => navigator.clipboard.writeText(res)
    toast(() => (
        <span className="flex items-center justify-between gap-8">
            {res}
            <Button
                size="icon"
                onClick={handleCopy}
                variant="outline"
                className="text-white"
            >
                copy
                {/* <CopyCheck /> */}
            </Button>
        </span>
    ))
    setTimeout(() => (res = ''), 5000)
}
