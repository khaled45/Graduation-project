var mongoose = require('mongoose')

let diagnosisForm = new mongoose.model('DiagnosisForm', {
    _id: mongoose.Schema.Types.ObjectId,
    Dform: [],
    patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }

})

module.exports = diagnosisForm 