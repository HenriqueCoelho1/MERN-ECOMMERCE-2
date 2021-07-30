const express = require('express')

const router = express.Router()

const { authCheck } = require('../middleware/auth')
const { createOrUpdateUser, currentUser } = require('../controllers/auth')

router.post("/create-or-update-user", authCheck, createOrUpdateUser)
router.post("/current-user", authCheck, currentUser)


router.get('/hello', (req, res) => {
    res.json({
        data: "Hey you hit node API endpoint"
    })
})


// //test
// const checking = (req, res, next) => {
//     console.log('Hello World!')
//     next()
// }

// router.get('/test', checking, (req, res) => {
//     res.json({
//         data: 'Hello World!'
//     })
// })

module.exports = router
