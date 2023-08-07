import mongoose from 'mongoose'

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Connected to database')
        })
        connection.on('error', (error) => {
            console.log(`DB connection error: ${error}`)
            process.exit(0)
        })
        connection.on('disconnected', () => {
            console.log('Mongoose connection is disconnected')
            process.exit(0)
        })
    } catch (err) {
        console.log(`DB connection error: ${err}`)
        process.exit(0)
    }
}
