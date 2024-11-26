import { toast } from "react-toastify"
import { logoutSuccess } from "../redux/user/userSlice"




export const resultCheck = (dispatch, result, navigate, to) => {
    if(!result){
        return "argument required"
    }
    if(result.success == false){
        if(result.message == "Please login to proceed furthor") dispatch(logoutSuccess())
        toast.warn(result.message || "Internal Error")
        return
    }

    toast.success(result.message)
    if(to){
        navigate(to)
    }

    return true
    
}

export const catchHandler = (dispatch, error) => {
    if(error){
        return "error argument not passed"
    }
    if(error.message === "Forbidden"){
        dispatch(logoutSuccess())
    }else{
        toast.error(error.message || "Internal error")
    }
}