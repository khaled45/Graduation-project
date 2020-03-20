var mongoose = require('mongoose'),
    patientModel = require('../models/patientModel'),
    doctorModel = require('../models/doctorModel'),
    diagnosisForm = require('../models/DiagnosisForm')


function patientAPI(app) {

    app.post("/patientsignup", (req, resp) => {

        const { name, username, password } = req.body

        let p1 = new patientModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,

        })

        p1.save((err, data) => {

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



    app.post("/uploadPImage", (req, resp) => {

        const { _id, avatar } = req.session.user
        patientModel.findOne({ _id }).exec((err, PData) => {
            PData.avatar = avatar
            PData.save((err, data) => {
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })

    });

    app.get('/getPImageProfile', (req, resp) => {
        const { _id } = req.session.user

        patientModel.findOne({ _id }).exec((err, data) => {
            const avatar = data.avatar
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', avatar })

        })
    })


    app.post("/fillDiagnosisForm", (req, resp) => {

        const { _id } = req.session.user
        const { Dform, doctorID } = req.body

        const DF = new diagnosisForm({
            _id: mongoose.Types.ObjectId(),
            Dform: Dform,
            doctorID: doctorID,
            patientID: _id

        })

        DF.save((err, data) => {

            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

        })

    });


    app.post("/chooseDoctor", (req, resp) => {
        const { _id } = req.session.user
        const { doctorID } = req.body

        doctorModel.findOne({ _id: doctorID }).exec((err, doctordata) => {
            doctordata.patientID.push(_id)
            doctordata.save((err, data) => {
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })

        patientModel.findOne({ _id }).exec((err, patientdata) => {
            patientdata.doctorID.push(doctorID)
            patientdata.save((err, data) => {
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })


    });

}





module.exports = patientAPI



