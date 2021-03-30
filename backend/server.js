import express from 'express'
import dotenv from 'dotenv'

dotenv.config()


const app = express()


app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running on Port 5000 ${process.env.NODE_ENV} on port ${PORT}`))