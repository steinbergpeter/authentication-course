import { connect } from '@/lib/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json()
        const emailIsUsed = !!(await User.findOne({ email }))
        if (emailIsUsed) {
            return NextResponse.json(
                {
                    error: 'User with that email already exists',
                },
                { status: 400 }
            )
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        //send verification email
        // await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
        const savedUser = await newUser.save()
        const data = JSON.stringify({
            message: 'User created successfully',
            success: true,
            savedUser,
        })
        return new NextResponse(data, { status: 201 })
    } catch (err) {
        if (err instanceof Error) {
            const data = JSON.stringify({ error: err.message, success: false })
            return new NextResponse(data, { status: 500 })
        }
    }
}
