var mongoose = require('mongoose')
var patientModel = require('../models/patientModel')
var doctorModel = require('../models/doctorModel')



function patientAPI(app) {

    app.post("/patientsignup", (req, resp) => {

        const { name, username, password, doctorID } = req.body

        let p1 = new patientModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            doctorID

        })

        p1.save((err, data) => {

            doctorModel.findOne({ _id: doctorID }).exec((err, doctordata) => {
                doctordata.patientID.push(data._id)
                doctordata.save()
            })

            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

        })

    });

    app.post("/patientsignin", (req, resp) => {

        const { username, password } = req.body

        patientModel.findOne({ username, password }).exec((err, data) => {
            if (data) {
                req.session.user = data
                resp.json({ message: 'success', data })

            } else {
                resp.json({ message: "error" });
            }

        })

    });

    app.get('/patientsignout', async (req, resp) => {

        await req.session.destroy()
        resp.json({ message: "success" })

    });


    app.get('/showdoctor', (req, resp) => {
        const { _id } = req.session.user
        patientModel.findOne({ _id }).exec((err, data) => {
            doctor = data.doctorID
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', doctor })

        })
    })


    app.post('/fillDiagnosisForm', (req, resp) => {

        const { _id, diagnoses_form } = req.body
        patientModel.findOne({ _id }).exec((err, Patientdata) => {
            Patientdata.diagnoses_form.push(diagnoses_form)
            Patientdata.save((err,data)=>{
 
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })

    })



}





module.exports = patientAPI



