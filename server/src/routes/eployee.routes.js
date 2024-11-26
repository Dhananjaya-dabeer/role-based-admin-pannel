import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import { signup } from "../controllers/auth.controllers.js"
import { editEmployee } from "../controllers/getEmployee.controllers.js"

const router = express.Router()

router.post("/employee", verifyToken, signup )
router.put("/edit/:id", verifyToken, editEmployee)

export default router