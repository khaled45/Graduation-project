import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.component.html',
  styleUrls: ['./dprofile.component.scss']
})
export class DProfileComponent implements OnInit {

  constructor(public MydoctorService: doctorService, public MyActivatedRoute: ActivatedRoute) { }

  public answers: any[] = [{
    answer: '',
  }];

  DId: any = this.MyActivatedRoute.snapshot.paramMap.get('id')
  DData: any = {}
  DoctorQST: any = []


  ngOnInit() {
    this.getDoctorProfile()
  }



  getDoctorProfile() {
    let id = this.DId

    this.MydoctorService.getDoctoById({ id }).subscribe((resp: any) => {

      this.DData = resp.data
      this.showQst()
    })
  }

  showQst() {
    let questions = this.DData.questions
    console.log(questions)

    questions.forEach(element => {

      this.DoctorQST.push(element.question)

    });



  }



}
