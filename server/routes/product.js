const express = require('express')

const router = express.Router()

//middleware
const { authCheck, adminCheck } = require('../middleware/auth')
//controllers
const { create } = require('../controllers/product')

//routes
router.post('/product', authCheck, adminCheck, create)



module.exports = router
