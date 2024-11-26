import mongoose from "mongoose";

const LabReportSchema = new mongoose.Schema({
    reportTitle: {
        type: String,
        required: true
    },
    sampleId: {
        type: String,
        required: true
    },
    labDate: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    technicianName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },  
    testType: {
        type: String,
        required: true
    },     
    technicianId: {
        type: String,
        required: true
    }, 
    labNotes: {
        type: String,
        required: true
    },     
    reportStatus: {
        type: String,
        required: true
    }, 
    doctorName: {
        type: String,
        required: true
    }
})

export const LabReport = mongoose.model("LabReport", LabReportSchema)