const admin = require('../firebase')


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