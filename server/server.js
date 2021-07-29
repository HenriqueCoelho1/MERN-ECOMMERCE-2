const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const dbConnection = require('./db/config')
const auth = require('./routes/auth')
const { readdirSync } = require('fs')



const app = express()
dbConnection()



app.use(morgan("dev"))
app.use(cors())
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in mode on port ${PORT}`
    )
)


