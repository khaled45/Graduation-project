var mongoose = require('mongoose')

let patientModel = new mongoose.model('Patient', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String, unique: true },
    password: String,
    diagnoses_form: Array,
    doctorID: { type: mongoose.Schema.Types.ObjectId , ref: 'Doctor'},
    image:String
})

module.exports = patientModel 