import { dbConnect } from '@/lib/dbConnect'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

dbConnect()

export async function POST(req: NextRequest) {
    console.log('########### login route called')
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json(
                {
                    error: 'Email & Password are required',
                },
                { status: 400 }
            )
        }

        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                {
                    error: 'Either email or password is incorrect',
                },
                { status: 400 }
            )
        }

        // Check if password is correct
        const isValidPassword = await bcryptjs.compare(password, user.password)
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Either email or password is incorrect' },
                { status: 400 }
            )
        }

        // Create token data
        const tokenData = {
            userId: user._id,
            userName: user.fullName,
            userEmail: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1h',
        })

        console.log('***token: ', JSON.stringify(token))

        const resData = JSON.stringify({
            message: 'Login successful',
            success: true,
        })

        console.log('***resData: ', resData)

        const response = NextResponse.json(resData)

        // console.log('***response: ', response)

        // response.cookies.set('token', token, { httpOnly: true })

        // return response
    } catch (err) {
        if (err instanceof Error) {
            const data = JSON.stringify({ error: err.message, success: false })
            return new NextResponse(data, { status: 500 })
        }
    }
}
