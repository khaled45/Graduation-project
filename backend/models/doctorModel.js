var mongoose = require('mongoose')

let doctorModel = new mongoose.model('Doctor', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String },
    password: String,
    location: String,
    avatar: String,
    questions: [],
    D_Pro_Images: [],
    patientID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
})

module.exports = doctorModel 