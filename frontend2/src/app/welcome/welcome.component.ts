import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { doctorService } from '../services/doctor.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images;
  multipleImages = [];
  username: any
  password: any
  imageprofile:any
  constructor(private mydoctorService: doctorService) { }

  ngOnInit() {
    
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);

    this.mydoctorService.uploadDImage(formData).subscribe((resp) => {
      console.log(resp)
    })

  }


  signin() {
    const { username, password } = this
    if (username && password) {
      this.mydoctorService.signin({
        username, password
      }).subscribe((response: any) => {

        if (response.message === 'success') {
          console.log(response.message)
        } else {
          alert('error in response')
        }
      })

    }
    else {
      alert("please complete your signin..")
    }
  }


  getimageprofile() {
    this.mydoctorService.getDImageProfile().subscribe((resp: any) => {
    
      this.imageprofile = resp.imageProfile
    })
  }

}