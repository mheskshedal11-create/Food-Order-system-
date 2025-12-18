import app from "./app.js";
import connectDb from "./database/connection.js";
import authRouter from "./routes/auth.route.js";

const PORT = process.env.PORT || 4000
connectDb()


//router setup
app.use('/api/v1/auth', authRouter)



app.listen(PORT, () => {
    console.log(`server is running  http://localhost:${PORT}`)
})