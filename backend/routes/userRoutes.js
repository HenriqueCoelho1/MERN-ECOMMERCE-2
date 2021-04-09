import express from 'express'

const router = express.Router()
//controllers
import { home, createOrUpdateUser } from '../controllers/userController.js'

//midlewares
import { authCheck } from '../middleware/authMiddleware.js'

router.post('/create-or-update-user', authCheck, createOrUpdateUser)




export default router