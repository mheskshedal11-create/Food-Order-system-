import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())





export default app