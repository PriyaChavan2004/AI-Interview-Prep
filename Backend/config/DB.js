import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB successfully connected`)
    } catch (error) {
        console.log(`This error is coming connectDB, error->${error}`)
    }
}