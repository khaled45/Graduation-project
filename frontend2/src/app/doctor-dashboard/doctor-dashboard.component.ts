import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doctorService } from '../services/doctor.service';
import { UploadService } from '../services/UploadFiles.service';
import { UploadModelModule } from '../upload-model/upload-model.module';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(public MyActivatedRoute: ActivatedRoute, private MydoctorService: doctorService, private myUploadService: UploadService) { }

  ngOnInit() {
    this.getDoctorProfile()
    this.getimageProfile()
  }


  images: any
  currentUpload: UploadModelModule;
  imageURL: any
  DId: any = this.MyActivatedRoute.snapshot.paramMap.get('id')

  DData: any = {}


  getDoctorProfile() {
    let id = this.DId
    this.MydoctorService.getDoctoById({ id }).subscribe((resp: any) => {
      this.DData = resp.data
    })
  }



  selectImage(event) {

    const file = event.target.files[0];
    this.images = file;

    this.currentUpload = new UploadModelModule(this.images);
    this.currentUpload.user = 'Doctors'
  }

  onSubmit() {
    this.myUploadService.pushUpload(this.currentUpload)

  }


  getimageProfile() {

    this.MydoctorService.getDImageProfile().subscribe((resp: any) => {
      this.imageURL = resp.avatar
    })
  }


}
