import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class doctorService {

    backendApiUrl = 'http://localhost:8085/'

    constructor(public myHttpClient: HttpClient) { }

    signup(data) {

        return this.myHttpClient.post('http://localhost:8085/doctorsignup', data)

    }

    signin(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'doctorsignin', data, { withCredentials: true })

    }

    signout() {
        return this.myHttpClient.get(this.backendApiUrl + 'doctorsignout', { withCredentials: true })

    }

    showPatient() {

        return this.myHttpClient.get(this.backendApiUrl + 'showpatient', { withCredentials: true })

    }

    getPatientForm() {

        return this.myHttpClient.get(this.backendApiUrl + 'getpatientform', { withCredentials: true })

    }

    getdoctorData() {
        return this.myHttpClient.get(this.backendApiUrl + 'getdoctorsData', { withCredentials: true })

    }

    getDoctoById(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'getdoctorsById', data, { withCredentials: true })

    }

}