import express from 'express'
import { getReport, createReport, editReport, DeleteReport, getSingleReport, numberOfLabreports } from '../controllers/doctorsReport.controllers.js'
import { verifyToken } from '../utils/verifyToken.js'


const router = express.Router()

router.get('/single/:id',verifyToken ,getSingleReport )
router.get('/get',verifyToken, getReport)
router.post('/create',verifyToken, createReport)
router.put('/update/:id',verifyToken, editReport)
router.delete('/delete/:id',verifyToken, DeleteReport)
router.get('/home',verifyToken, numberOfLabreports)


export default router