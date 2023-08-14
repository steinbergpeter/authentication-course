import mongoose from 'mongoose'

export interface iUser {
    fullName: string
    email: string
    password: string
    isVerified: boolean
    isAdmin: boolean
    forgotPasswordToken: string
    forgotPasswordTokenExpiry: Date
    verifyToken: string
    verifyTokenExpiry: Date
}
const userSchema = new mongoose.Schema<iUser>({
    fullName: {
        type: String,
        required: [true, 'Please enter a fullName'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model<iUser>('users', userSchema)

export default User
