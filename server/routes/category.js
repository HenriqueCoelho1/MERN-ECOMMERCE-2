const express = require('express')

const router = express.Router()

//middleware
const { authCheck, adminCheck } = require('../middleware/auth')
//controllers
const { create, read, update, remove, list } = require('../controllers/category')

//routes
router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)



module.exports = router