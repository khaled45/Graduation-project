var mongoose = require('mongoose'),
    doctorModel = require('../models/doctorModel'),
    patientModel = require('../models/patientModel'),
    multer = require('multer')
path = require('path')

// Multer File upload settings

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })



function doctorAPI(app) {

    app.post("/doctorsignup", (req, resp) => {

        const { name, username, password, location, questions } = req.body
        const d1 = new doctorModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            questions,
            location,
        })
        d1.save((err, data) => {
            debugger
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


    app.post('/uploadDImage', upload.single('file'), (req, res, next) => {

        const { _id } = req.session.user
        const file = req.file;
        if (!file) {
            const error = new Error('No File')
            error.httpStatusCode = 400
            return next(error)
        }
        doctorModel.findOne({ _id }).exec((err, Ddata) => {

            Ddata.avatar.push({
                fileDest: `uploads/${file.filename}`,
                filename: file.filename,
                originalname: file.originalname
            });
            Ddata.save((err, data) => {
                err ? res.json({ message: 'error' }) : res.json({ message: 'saved', data })
            });
        });

    })


    app.get('/getDImageProfile', (req, resp) => {
        const { _id } = req.session.user

        doctorModel.findOne({ _id }).exec((err, data) => {
            const imageProfile = data.avatar[0].fileDest
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', imageProfile })

        })
    })

}

module.exports = doctorAPI



