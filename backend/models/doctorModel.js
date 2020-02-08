var mongoose = require('mongoose')

let doctorModel = new mongoose.model('Doctor', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String, unique: true },
    password: String,
    location: String,
    Medical_form: [{ type: String }],
    patientID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
})

module.exports = doctorModel 