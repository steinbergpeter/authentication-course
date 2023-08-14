import { dbConnect } from '@/lib/dbConnect'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { CONFIG_FILES } from 'next/dist/shared/lib/constants'
import { NextResponse, NextRequest } from 'next/server'

dbConnect().then(() => console.log('connected to db via signup route'))

export async function POST(req: NextRequest) {
    console.log('entered signup POST function on backend')
    try {
        console.log('entered Signup tryblock on backend')
        const { fullName, email, password } = await req.json()
        console.log({ fullName, email, password })
        // Check if email already exists
        const isEmailAlreadyUsed = !!(await User.findOne({ email }))
        console.log({ isEmailAlreadyUsed })
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
        console.log({ newUser })
        const finalUser = await User.create(newUser)
        console.log({ finalUser })
        //send verification email
        // await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
        // const savedUser = await newUser.save()
        // console.log({ savedUser })
        // return new NextResponse(
        //     JSON.stringify({
        //         message: 'User created successfully',
        //         success: true,
        //         savedUser,
        //     }),
        //     { status: 201 }
        // )
    } catch (err) {
        if (err instanceof Error) {
            return new NextResponse(
                JSON.stringify({ error: err.message, success: false }),
                { status: 500 }
            )
        }
    }
}
