var mongoose = require('mongoose')

let patientModel = new mongoose.model('Patient', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String, unique: true },
    password: String,
    avatar: String,
    doctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
})

module.exports = patientModel 