import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import colors from 'colors'
import connectDB from './config/db.js'
//middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//route imports
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()
const app = express()
app.use(express.json())

//route middleware
app.use('/api/users', userRoutes)
// readdirSync("./routes").map((r) => app.use("/api", dirRoutes + r));

app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})

//middleware <-----
// app.use(bodyParser.json({limit: '2mb'}))
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(notFound)
app.use(errorHandler)
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT,
    console.log(
        `Server Running on Port ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))