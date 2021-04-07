import express from 'express'

const router = express.Router()
//controllers
import { home, createOrUpdateUser } from '../controllers/userController.js'

router.get('/', home)
router.get('/create-or-update-user', createOrUpdateUser)




export default router