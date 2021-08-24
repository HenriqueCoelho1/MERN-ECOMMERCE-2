const express = require('express')

const router = express.Router()

//middleware
const { authCheck, adminCheck } = require('../middleware/auth')
//controllers
const { create, listAll, remove } = require('../controllers/product')

//routes
router.post('/product', authCheck, adminCheck, create)
router.get('/products/:count', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)



module.exports = router
