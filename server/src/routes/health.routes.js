import express from 'express'
import { health } from '../controllers/health.conrollers.js'

const router = express.Router()

router.get('/test', health)

export default router