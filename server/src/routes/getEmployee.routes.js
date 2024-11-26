import express from 'express'
import { deleteEmployee, getSingleEmployee, list } from '../controllers/getEmployee.controllers.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/list', verifyToken , list)
router.get('/single/:id', verifyToken , getSingleEmployee)
router.delete('/delete/:id', verifyToken , deleteEmployee)

export default router