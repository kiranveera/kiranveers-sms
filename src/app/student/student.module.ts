import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewmarksComponent } from './home/viewmarks/viewmarks.component';
import { FeesstatusComponent } from './home/feesstatus/feesstatus.component';
import { AttendencestatusComponent } from './home/attendencestatus/attendencestatus.component';
import { EditprofileComponent } from './home/editprofile/editprofile.component';
import { NotificationsComponent } from './home/notifications/notifications.component';

import { RequestComponent } from './home/request/request.component';
import {  LogoutComponent} from './home/logout/logout.component';

@NgModule({
  declarations: [HomeComponent, ViewmarksComponent, FeesstatusComponent, AttendencestatusComponent, EditprofileComponent, NotificationsComponent, RequestComponent, LogoutComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule
  ]
})
export class StudentModule { }
