import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images;
  username: any
  password: any
  imageprofile: any
  constructor(private mydoctorService: doctorService, ) { }

  ngOnInit() {

  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  

}