import { dbConnect } from '@/lib/dbConnect'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse, NextRequest } from 'next/server'

dbConnect()

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password } = await req.json()

        // Check if email already exists
        const isEmailAlreadyUsed = !!(await User.findOne({ email }))
        if (isEmailAlreadyUsed) {
            return NextResponse.json(
                JSON.stringify({
                    error: 'User with that email already exists',
                }),
                { status: 400 }
            )
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await new User({
            fullName,
            email,
            password: hashedPassword,
        })

        //send verification email
        // await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
        const savedUser = await newUser.save()
        return new NextResponse(
            JSON.stringify({
                message: 'User created successfully',
                success: true,
                savedUser,
            }),
            { status: 201 }
        )
    } catch (err) {
        if (err instanceof Error) {
            return new NextResponse(
                JSON.stringify({ error: err.message, success: false }),
                { status: 500 }
            )
        }
    }
}
