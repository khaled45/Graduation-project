import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(public MyActivatedRoute: ActivatedRoute, private MydoctorService: doctorService) { }

  ngOnInit() {
    this.getDoctorProfile()
  }
  DId: any = this.MyActivatedRoute.snapshot.paramMap.get('id')

  DData: any = {}


  getDoctorProfile() {
    let id = this.DId

    this.MydoctorService.getDoctoById({ id }).subscribe((resp: any) => {
      debugger
      this.DData = resp.data
    })
  }
}
