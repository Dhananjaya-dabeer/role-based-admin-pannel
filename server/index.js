import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import loginRouter from './src/routes/auth.routes.js'
import getEmplyeeRouter from './src/routes/getEmployee.routes.js'
import healthRouter from './src/routes/health.routes.js'
import createEmployeeRouter from './src/routes/eployee.routes.js'
dotenv.config()
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to DB")
})
.catch((err) => {
    console.log(err)
})

const app = express()

app.use(express.json())
app.use(cors(
    {
    origin: [`${process.env.ORIGIN}`, `${process.env.TUNNEL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}
))
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`server listening to ${process.env.PORT}`)
})


app.use('/api/health', healthRouter)
app.use('/api/auth/', loginRouter)
app.use('/api/create/', createEmployeeRouter)
app.use('/api/get/', getEmplyeeRouter )


app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal server error'
    return res.json({
        success: false,
        statusCode,
        message
    })
})