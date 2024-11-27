import { User } from "../modals/user.modals.js"
import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const {username, email, password, role, key} = req.body
        let userRole
        if(req.user)  ({role: userRole} =  req.user)
            if(!username || !email || !password || !role) return next(errorHandler(400, "All fields are required!"))
                if(!key) {
                    if(userRole && userRole !== "admin"){
                        return next (errorHandler(403, "You are not Authorized"))
                    }
                }
        console.log('Employee creation request received');
        const existingAdmin = await User.findOne({email})
        if(existingAdmin) return next(errorHandler(409, "user already exists"))
        if(key !== process.env.ADMIN_SIGNUP_KEY && !userRole ){
            return next(errorHandler(403, "Invalid Secret Key"))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10)
        const userData = new User({
            username,
            email,
            password: hashedPassword,
            role
        })

        await userData.save()
        return res.json({
            success: true,
            statusCode: 201,
            message: userRole ? "Employee created successfully" : "Signed up successfully" 
        })
    } catch (error) {
     next(error)   
    }
}

export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return next(errorHandler(400, "All fields are required!"))

        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, "user not found"))

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(403, "Either email id or passowrd is wrong"))

        const token = jwt.sign({id: validUser._id, role: validUser.role}, process.env.JWT_SECRET, {expiresIn: '1d'})
        const {password: key, ...rest} = validUser._doc
       return  res.cookie(
            "access_token",
            token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                // expires: new Date( Date.now() + 24 * 60 * 60 * 1000),
                expires: new Date( Date.now() + 60 * 60 * 1000),
                path: '/'
            }
        ).status(200).json({
            success: true,
            data: rest,
            message: "Logged in successfully",
            statusCode: 200
        })

    } catch (error) {
        next(error)
    }
}

export const logout = async(req, res, next) => {
    try {
        return res.clearCookie("access_token").status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        next(error)
    }
}