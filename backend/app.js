import express from 'express'
import 'dotenv/config'

const app = express()


//global error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});



export default app