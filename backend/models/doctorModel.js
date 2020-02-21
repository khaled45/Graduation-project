var mongoose = require('mongoose')

let doctorModel = new mongoose.model('Doctor', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String },
    password: String,
    location: String,
    questions: [],
    patientID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
})

module.exports = doctorModel 