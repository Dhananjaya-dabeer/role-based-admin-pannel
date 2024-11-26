import express from 'express'
import { login, logout, signup } from '../controllers/auth.controllers.js'
import { verifyToken } from '../utils/verifyToken.js'


const router = express.Router()

router.post('/login', login )
router.post('/signup', signup)
router.post('/logout', verifyToken, logout)

export default router