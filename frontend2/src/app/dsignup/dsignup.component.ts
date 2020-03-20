import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './Dsignup.component.html',
  styleUrls: ['./Dsignup.component.scss']
})
export class SignupComponent implements OnInit {


  constructor(public mydoctorService: doctorService, public myRouter: Router, private myFormBuilder: FormBuilder, ) { }

  ngOnInit() {
  }

  
  public questions: any[] = [{
    question: '',
  }];


  name: any = ''
  username: any = ''
  password: any = ''
  location: any = ''


  doctorSignUp() {

    const { name, username, location, password, questions } = this
    debugger
    if (name && password && username && questions && location) {

      this.mydoctorService.signup({ name, username, password, questions, location }).subscribe((resp: any) => {

        if (resp.message == "success") {
          debugger
          this.myRouter.navigate(['/'])
        } else {
          alert('response error')
        }

      })

    }

  }



  addQST() {
    this.questions.push({
      question: '',
    });
  }

  removeQST(i: number) {
    this.questions.splice(i, 1);
  }

  logValue() {
    debugger
    console.log(this.questions);
  }




}