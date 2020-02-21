import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class patientService {

    backendApiUrl = 'http://localhost:8085/'

    constructor(public myHttpClient: HttpClient) { }

    signup(data) {

        return this.myHttpClient.post('http://localhost:8085/patientsignup', data, { withCredentials: true })
    }

    signin(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'patientsignin', data, { withCredentials: true })

    }

    signout() {
        return this.myHttpClient.get(this.backendApiUrl + 'patientsignout', { withCredentials: true })

    }

    showDoctor() {

        return this.myHttpClient.get(this.backendApiUrl + 'showdoctor', { withCredentials: true })

    }

    uploadImage() {

        return this.myHttpClient.post(this.backendApiUrl + 'uploadImage', { withCredentials: true })

    }


    fillDiagnosisForm(data){

        return this.myHttpClient.post(this.backendApiUrl + 'fillDiagnosisForm', data, { withCredentials: true })

    }


}