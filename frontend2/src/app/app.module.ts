import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './dsignup/dsignup.component';
import { PsignupComponent } from './psignup/psignup.component';
import { PsigninComponent } from './psignin/psignin.component';
import { HomeComponent } from './home/home.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TreatmentPlanComponent } from './treatment-plan/treatment-plan.component';
import { DProfileComponent } from './dprofile/dprofile.component';
import { DsigninComponent } from './dsignin/dsignin.component';
import { TourismComponent } from './tourism/tourism.component';
import { TourProfileComponent } from './tour-profile/tour-profile.component';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PsignupComponent,
    PsigninComponent,
    HomeComponent,
    DoctorDashboardComponent,
    WelcomeComponent,
    TreatmentPlanComponent,
    DProfileComponent,
    DsigninComponent,
    TourismComponent,
    TourProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dProfile/:id', component: DProfileComponent },
      { path: 'DsignUp', component: SignupComponent },
      { path: 'DsignIn', component: DsigninComponent },
      { path: 'PsignUp', component: PsignupComponent },
      { path: 'PsignIn', component: PsigninComponent },
      { path: 'treatmentPlan', component: TreatmentPlanComponent },
      { path: 'dashboard/:id', component: DoctorDashboardComponent },
      { path: 'tourism', component: TourismComponent, },
      { path: 'tourProfile', component: TourProfileComponent, },

      { path: '**', redirectTo: 'home' },

    ]),

    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
