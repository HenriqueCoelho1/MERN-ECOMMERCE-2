import asyncHandler from 'express-async-handler'

const createOrUpdateUser = asyncHandler(async (req, res) => {
    res.json({
        data: 'You hit the endpoint'
    })
})

const home = (req, res) => {
    res.json({
        data: 'Hello user route'
    })
}


export { createOrUpdateUser, home }