import admin from '../firebase.js'

export const authCheck = (req, res, next) => {
    console.log(req.headers)
    next()
}