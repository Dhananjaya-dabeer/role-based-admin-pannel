import { User } from "../modals/user.modals.js"
import { errorHandler } from "../utils/errorHandler.js"


export const list = async(req, res, next) => {
    try {
        const users = await User.find()
        
        const filteredUsers = users.map((user) => {
            const {password, ...rest} = user._doc
            return {...rest}
        })

        return res.status(200).json({
            success: true,
            data: filteredUsers
        })
    } catch (error) {
        next(error)
    }
}

export const editEmployee = async(req, res, next) =>{
    const {id:userId} = req.params
    const {role: userRole} = req.user
    const {username, email, role} = req.body
    if(userRole !== "admin") return next(403, "You are not authorized to do this")
    try {
        if(!userId){
            return next(errorHandler(400), 'Id required bad request')
        }
        const verifyEmailCheck = await User.findOne({email})
        if(verifyEmailCheck){
            const {id} = verifyEmailCheck
            if(id !== userId)  return next(errorHandler(400, "bad request email already exists"))
        }
        const findUser = await User.findByIdAndUpdate(userId, {username, email, role},{new:true})
        if(!findUser){
            return next(errorHandler(404, "User not found to edit"))
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            data: findUser,
            message: "Employee updated"
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleEmployee = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id){
            return next(errorHandler(400), 'Id required bad request')
        }
        const {role} = req.user
        if(role !== "admin")  return next(errorHandler(403, "Your are not authorized to view this"))
        const foundUser = await User.findById(id)
        if(!foundUser){
            return next(errorHandler(404, "No employee exist of the kind"))
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            data: foundUser
        })
    } catch (error) {
        next(error)
    }
}

export const deleteEmployee = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id) return next(errorHandler(400, "Bad request id required"))
        const {role} = req.user
        if(role !== "admin")  return next(errorHandler(403, "Your are not authorized to do this action"))
        const deleteUser = await User.findOneAndDelete(id, {new: true})
        res.status(201).json({
            success: true,
            statusCode: 201,
            data: deleteUser,
            message: "User deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}