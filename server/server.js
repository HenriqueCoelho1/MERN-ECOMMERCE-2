const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.DATABASE
const auth = require('./routes/auth')
const { readdirSync } = require('fs')



const app = express()

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err.message))



app.use(morgan("dev"))

// app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000 }));
app.use(bodyParser({ limit: '50mb' }));
app.use(express.json());
app.use(cors())
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in mode on port ${PORT}`
    )
)


