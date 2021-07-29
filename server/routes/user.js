const express = require('express')

const route = express.Router()

route.get('/user', (req, res) => {
    res.json({
        data: "Hey you hit the user endpoint"
    })
})

module.exports = route
