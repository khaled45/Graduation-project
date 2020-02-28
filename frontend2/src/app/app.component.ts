import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { TreatmentPlanComponent } from './treatment-plan/treatment-plan.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend2';

  constructor(public myMatDialog: MatDialog, ) { }


  onCreate() {
    const DialogConfig = new MatDialogConfig()
    DialogConfig.disableClose = true
    DialogConfig.autoFocus = true
    DialogConfig.width = "100%"
    this.myMatDialog.open(TreatmentPlanComponent)

  }



}

