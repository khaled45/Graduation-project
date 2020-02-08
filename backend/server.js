var express = require('express')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var uuid = require('uuid/v4')
var doctorApi = require('./api/doctorAPI')
var patientApi = require('./api/patientAPI')
var DBconnection = require('./DBconnction')
var app = express()

app.use(express.json())
app.use(express.static('./public'));
app.use(cookieParser())
app.use(session({
    genid: uuid,
    secret: 'mysecret'
}))

app.use(
    cors({
        origin: ' http://localhost:4200',
        credentials: true
    })

)


app.use(authenticate)

DBconnection()

function authenticate(req, resp, next) {

    if (req.url === '/doctorsignup' || req.url === '/doctorsignin' || req.url === '/patientsignup' || req.url === '/patientsignin') {
        next()
    } else {
        if (req.session.user && req.cookies["connect.sid"]) {
            next()
        } else {
            resp.json('authentication failed')
        }


    }

}

doctorApi(app)
patientApi(app)

app.get('/', (req, resp) => {
    resp.json({ message: "server on port 8085" })

})


app.listen(8085);