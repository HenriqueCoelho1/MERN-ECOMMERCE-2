const admin = require('../firebase')
const User = require('../models/user')


exports.authCheck = async (req, res, next) => {
    // console.log(req.headers)

    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        // console.log("USER IN CHECK FIREBASE", firebaseUser)
        req.user = firebaseUser
        next()
    } catch (err) {
        res.status(401).json({
            err: "Expired or invalid Token"
        })
    }
}

exports.adminCheck = async (req, res, next) => {

    const { email } = req.user
    const adminUser = await User.findOne({ email }).exec()
    if (adminUser.role !== "admin") {
        res.status(403).json({
            err: "Access Denied"
        })
    } else {
        next()
    }
}