import { dbConnect } from '@/lib/dbConnect'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

dbConnect().then(() => console.log('connected to db via logged in route'))

export async function POST(req: NextRequest) {
    console.log('entered POST function on backend')
    try {
        console.log('entered tryblock on backend')
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
                { error: 'Either email or password is incorrect' },
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

        console.log('------------- token: ', token)

        const responseBody = JSON.stringify({
            success: true,
            message: 'Logged in successfully',
        })

        console.log('------------- responseBody: ', responseBody)

        const response = NextResponse.json(responseBody, {
            status: 201,
            headers: { 'content-type': 'application/json' },
        })

        console.log('------------- response: ', response)

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
        })

        const cookieTest = response.cookies.get('token')

        console.log('------------- cookieTest: ', cookieTest)
        return response
    } catch (err) {
        if (err instanceof Error) {
            return new NextResponse(
                JSON.stringify({ error: err.message, success: false }),
                { status: 500, headers: { 'content-type': 'application/json' } }
            )
        }
    }
}
