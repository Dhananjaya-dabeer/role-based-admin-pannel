import { DoctorReport } from "../modals/doctorReport.modals.js"
import { errorHandler } from "../utils/errorHandler.js"

const roles = ["admin", "moderator", "doctor"]

export const createReport = async (req, res, next) => {
  try {

      const {  
          patientName,
          patientId,
          age,
          gender,
          dateOfVisit,
          diagnosis,
          treatmentPlan,
          medications,
          followUpDate,
          doctorName,
          comments} = req.body
        const {role} = req.user
          if(!patientName ||
              !patientId ||
              !age ||
              !gender ||
              !dateOfVisit ||
              !diagnosis ||
              !treatmentPlan ||
              !medications ||
              !followUpDate ||
              !doctorName ||
              !comments) return next(errorHandler(400, "All fields are rquired!"))
          
      const report = new DoctorReport({
          patientName,
          patientId,
          age,
          gender,
          dateOfVisit,
          diagnosis,
          treatmentPlan,
          medications,
          followUpDate,
          doctorName,
          comments
      })
  
      if(roles.includes(role)) {
        await report.save()
      }else{
        next(errorHandler(403, "you are not authorized to do this action"))
      }
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "report created successfully"
      })
  } catch (error) {
    next(error)
  }
}

export const DeleteReport = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id) return next(errorHandler(400, "bad request Id required"))
        const {role} = req.user
        if(roles.includes(role)){
            const deletedUser = await DoctorReport.findByIdAndDelete(id)
            if(deletedUser) 
            return res.status(201).json({
                success: true,
                statusCode: 201,
                data: deletedUser,
                message: "report deleted successfully"
            })
            else 
            return next(errorHandler(404, "report not found with id"))
        }else{
            next(errorHandler(403, "you are not authorized to do this action"))
        }
      
    } catch (error) {
        next(error)
    }
}

export const getReport = async (req, res, next) => {
    try {
        const {role} = req.user
        const getRoles = ["admin", "moderator", "doctor", "nurse"]
        if(getRoles.includes(role)){
            const reports = await DoctorReport.find()
            res.status(200).json({
                success: true,
                statusCode: 201,
                data: reports
            })
        }else{
            next(errorHandler(403, "you are not authorized to view the content"))
        }
        
    } catch (error) {
        next(error)
    }
}

export const editReport = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id) return next(errorHandler(400, "bad request Id required"))

        const {role} = req.user
        if(roles.includes(role)){
            const {  
                patientName,
                patientId,
                age,
                gender,
                dateOfVisit,
                diagnosis,
                treatmentPlan,
                medications,
                followUpDate,
                doctorName,
                comments} = req.body
                if(!patientName ||
                    !patientId ||
                    !age ||
                    !gender ||
                    !dateOfVisit ||
                    !diagnosis ||
                    !treatmentPlan ||
                    !medications ||
                    !followUpDate ||
                    !doctorName ||
                    !comments) return next(errorHandler(400, "All fields are rquired!"))
                const updatedReport = await DoctorReport.findByIdAndUpdate(id,
                    {  
                        patientName,
                        patientId,
                        age,
                        gender,
                        dateOfVisit,
                        diagnosis,
                        treatmentPlan,
                        medications,
                        followUpDate,
                        doctorName,
                        comments}
                 )
                 if(!updatedReport) return next(errorHandler(404, "report doesn't exist with the id"))
                 res.status(201).json({
                    success: true,
                    statusCode: 201,
                    message: "Report updated successfully",
                    data: updatedReport
                 })
        }else{
            next(errorHandler(403, "You are not authorized to do this action"))
        }
    } catch (error) {
        next(error)
    }
}

export const getSingleReport = async(req, res, next ) => {
    try {
        const {id} = req.params
        if(!id) return next(errorHandler(400, "bad request id is required"))
        const getRoles = ["admin", "moderator", "doctor", "nurse"]
        const {role} = req.user
        if(getRoles.includes(role)){
            const report = await DoctorReport.findById(id)
            if(!report) return next(errorHandler(404, "report not found with id kind"))
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: report
            })
        }else{
            return next(errorHandler(403, "You are not authorized to view this content"))
        }
    } catch (error) {
        next(error)
    }
}

export const numberOfLabreports = async(req, res, next) => {
    try {
        const {role} = req.user
        const getRoles = ["admin", "moderator", "lab_tech", "nurse", "doctor"]
        if(getRoles.includes(role)){
            const reports = await DoctorReport.find()
            res.status(200).json({
                success: true,
                statusCode: 201,
                data: reports.length
            })
        }else{
            next(errorHandler(403, "you are not authorized to view the content"))
        }
        
    } catch (error) {
        next(error)
    }
}