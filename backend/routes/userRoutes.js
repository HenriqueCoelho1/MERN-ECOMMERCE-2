import express from 'express'

const router = express.Router()
//controllers

router.get('/', (req, res) => {
    res.json({
        data: 'Hello user route'
    })
})
router.get('/create-or-update-user', (req, res) => {
    res.json({
        data: 'You hit the endpoint'
    })
})




export default router