import { dbConnect } from '@/lib/dbConnect'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
// import { sendEmail } from '@/helpers/mailer'
import { SignupInputValidator } from '@/lib/validators'
dbConnect()

export async function POST(request: NextRequest) {
    try {
        const reqBody: SignupInputValidator = await request.json()
        const { fullName, email, password } = reqBody
        //check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log('>>>>>> fullName: ', fullName)

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        })

        console.log('newUser: ', newUser)

        const savedUser = await newUser.save().catch((err: Error) => {
            console.log('err: ', err)
        })

        console.log('savedUser: ', savedUser)

        return
        //send verification email

        // await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })

        // return NextResponse.json({
        //     message: 'User created successfully',
        //     success: true,
        //     savedUser,
        // })
    } catch (error: any) {
        return
        // return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
