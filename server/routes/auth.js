const express = require('express')

const router = express.Router()

const { createOrUpdateUser } = require('../controllers/auth')

router.get("/create-or-update-user", createOrUpdateUser)

router.get('/hello', (req, res) => {
    res.json({
        data: "Hey you hit node API endpoint"
    })
})

module.exports = router
