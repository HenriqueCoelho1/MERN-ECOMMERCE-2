const express = require('express')
const dbConnection = require('./db/config')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()



const app = express()
dbConnection()



app.use(morgan("dev"))
app.use(cors())

app.get('/api', (req, res) => {
    res.json({
        data: "Hey you hit node API"
    })
})

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in mode on port ${PORT}`
    )
)


