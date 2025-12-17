import app from "./app.js";
import connectDb from "./database/connection.js";

const PORT = process.env.PORT || 4000
connectDb()


app.listen(PORT, () => {
    console.log(`server is running  http://localhost:${PORT}`)
})