import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms"
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { PostmarksComponent } from './home/postmarks/postmarks.component';
import { PostattendenceComponent } from './home/postattendence/postattendence.component';
import { UpdatefeesComponent } from './home/updatefees/updatefees.component';
import { StudentprofilesComponent } from './home/studentprofiles/studentprofiles.component';
import { SendnotificationsComponent } from './home/sendnotifications/sendnotifications.component';
import { RequestsComponent } from './home/requests/requests.component';
import { AddstudentComponent } from './home/addstudent/addstudent.component';
import { LogoutComponent } from './home/logout/logout.component';

@NgModule({
  declarations: [HomeComponent, PostmarksComponent, PostattendenceComponent, UpdatefeesComponent, StudentprofilesComponent, SendnotificationsComponent,  RequestsComponent, AddstudentComponent, LogoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
