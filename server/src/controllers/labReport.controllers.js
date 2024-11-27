import { LabReport } from "../modals/labReport.modals.js"
import { errorHandler } from "../utils/errorHandler.js"

const roles = ["admin", "moderator", "lab_tech"]
export const createReport = async(req, res, next) => {
    try {
        const {role} = req.user
        if(roles.includes(role)){
            const {
                reportTitle,
                sampleId,
                labDate,
                result,
                technicianName,
                patientName,  
                testType,     
                technicianId, 
                labNotes,     
                reportStatus, 
                doctorName, 
            } = req.body
            if(
                !reportTitle||
                !sampleId||
                !labDate||
                !result||
                !technicianName||
                !patientName||  
                !testType||     
                !technicianId|| 
                !labNotes||     
                !reportStatus|| 
                !doctorName 
            ) {
                return next(errorHandler(400, "All fields are reruired"))
            }
            const report = new LabReport(
                {
                    reportTitle,
                    sampleId,
                    labDate,
                    result,
                    technicianName,
                    patientName,  
                    testType,     
                    technicianId, 
                    labNotes,     
                    reportStatus, 
                    doctorName, 
                }
            )
            await report.save()
            return res.status(201).json({
                success: true,
                statusCode: 201,
                message: "Report created successfully"
            })
        }else {
            return next(errorHandler(403, "You are not authorized to do this action"))
        }
    } catch (error) {
        next(error)
    }
}

export const updatedReport = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id) return next(errorHandler(400, "bad request Id is required"))
        const {role} = req.user
        if(roles.includes(role)){
            const {
                reportTitle,
                sampleId,
                labDate,
                result,
                technicianName,
                patientName,  
                testType,     
                technicianId, 
                labNotes,     
                reportStatus, 
                doctorName, 
            } = req.body
            if(
                !reportTitle||
                !sampleId||
                !labDate||
                !result||
                !technicianName||
                !patientName||  
                !testType||     
                !technicianId|| 
                !labNotes||     
                !reportStatus|| 
                !doctorName 
            ) {
                return next(errorHandler(400, "All fields are reruired"))
            }
            const updatedReport = await LabReport.findByIdAndUpdate(id, {
                reportTitle,
                sampleId,
                labDate,
                result,
                technicianName,
                patientName,  
                testType,     
                technicianId, 
                labNotes,     
                reportStatus, 
                doctorName, 
            }, {new: true})
            if(!updatedReport) return next(errorHandler(404, "report doesn't exist with the id"))
            return  res.status(201).json({
                success: true,
                message: "Report updated Successfully",
                data: updateUser,
                statusCode: 201
            })
        }
    } catch (error) {
        next(error)
    }
}

export const DeleteReport = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id) return next(errorHandler(400, "bad request id is required"))
        const {role} = req.user
        if(roles.includes(role)){
            const deletedReport = await LabReport.findByIdAndDelete(id)
            if(!deletedReport) return next(errorHandler(404, "report doesn't exist with the id"))
            return res.status(201).json({
                success: true,
                messgae: "Report deleted successfully",
                statusCode: 201,
            })
        }else{
            return next(errorHandler(403, "You are not authorized to this action"))
        }
    } catch (error) {
        next(error)
    }
}
export const getReport = async(req, res, next) => {
    try {
        const getRoles = ["admin", "moderator", "lab_tech", "nurse"]
        const {role} = req.user
        if(getRoles.includes(role)){
            const reports = await LabReport.find()
            return res.status(200).json({
                success: true,
                data:reports,
                statusCode: 200
            })
        }else{
            return next(errorHandler(403, "You are not authorized to view this content"))
        }
    } catch (error) {
        next(error)
    }
}

export const getSingleReport = async (req, res, next) => {
    try {
        const getRoles = ["admin", "moderator", "lab_tech", "nurse"]
        const {id} = req.params
        if(!id) return next(errorHandler(400, "bad request id is required"))
        const {role} = req.user
        if(getRoles.includes(role)){
            const report = await LabReport.findById(id)
            if(!report) return next(errorHandler(400, "report not found with id kind"))
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data:report,
            })
        }else{
            next(errorHandler(403, "You are not allowed to view this content"))
        }
    } catch (error) {
        next(error)
    }
}

export const numberOfLabreports = async(req, res, next) => {
    try {
        const getRoles = ["admin", "moderator", "lab_tech", "nurse", "doctor"]
        const {role} = req.user
        if(getRoles.includes(role)){
            const reports = await LabReport.find()
            return res.status(200).json({
                success: true,
                data:reports.length,
                statusCode: 200
            })
        }else{
            return next(errorHandler(403, "You are not authorized to view this content"))
        }
    } catch (error) {
        next(error)
    }
}