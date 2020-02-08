var mongoose = require('mongoose')
var doctorModel = require('../models/doctorModel')
var patientModel = require('../models/patientModel')

function doctorAPI(app) {

    app.post("/doctorsignup", (req, resp) => {

        const { name, username, password, location, Medical_form } = req.body

        const d1 = new doctorModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            Medical_form,
            location,
        })

        d1.save((err, data) => {
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
        })
    });

    app.post("/doctorsignin", (req, resp) => {

        const { username, password } = req.body

        doctorModel.findOne({ username, password }).exec((err, data) => {
            if (data) {
                req.session.user = data
                resp.json({ message: 'success', data })

            } else {
                resp.json({ message: "error" });
            }

        })

    });

    app.get('/doctorsignout', async (req, resp) => {

        await req.session.destroy()
        resp.json({ message: "success" })

    });

    app.get('/showpatient', (req, resp) => {
        const { _id } = req.session.user
        doctorModel.findOne({ _id }).exec((err, data) => {
            patients = data.patientID
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', patients })

        })
    })

    app.get("/getpatientform", (req, resp) => {

        patientModel.find({}).exec((err, data) => {

            debugger

            // data.forEach(element => {
            //     form = element.diagnoses_form
            //     username = element.username
            // });

            result = data.map(({ diagnoses_form }) => { diagnoses_form })

            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', result })

        })

    });


    app.get('/getdoctorsData', (req, resp) => {

        doctorModel.find({}).exec((err, data) => {
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
        })

    })

    app.post('/getdoctorsById', (req, resp) => {

        const { id } = req.body

        doctorModel.findOne({ _id: id }).exec((err, data) => {
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
        })

    })

}

module.exports = doctorAPI