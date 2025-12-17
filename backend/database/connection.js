import mongoose from "mongoose";

const connectDb = async (req, res) => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log('database connect Successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDb