const multer = require('multer');
var mongoose = require('mongoose')
var patientModel = require('../models/patientModel')
var doctorModel = require('../models/doctorModel')



const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


function patientAPI(app) {

    app.post("/patientsignup", (req, resp) => {

        const { name, username, password, diagnoses_form, doctorID } = req.body

        let p1 = new patientModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            diagnoses_form,
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




}





module.exports = patientAPI



