import mongoose from "mongoose";

const doctorReoportSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfVisit: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatmentPlan: {
        type: String,
        required: true
    },
    medications: {
        type: String,
        required: true
    },
    followUpDate: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
}, {timestamps:true})


export const DoctorReport = mongoose.model("DoctorReport", doctorReoportSchema)