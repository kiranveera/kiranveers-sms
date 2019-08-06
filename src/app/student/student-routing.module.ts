import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewmarksComponent } from './home/viewmarks/viewmarks.component';
import { FeesstatusComponent } from './home/feesstatus/feesstatus.component';
import { AttendencestatusComponent } from './home/attendencestatus/attendencestatus.component';
import { EditprofileComponent } from './home/editprofile/editprofile.component';
import { NotificationsComponent } from './home/notifications/notifications.component';

import { RequestComponent } from './home/request/request.component';
import { LogoutComponent } from './home/logout/logout.component';

const routes: Routes = [
  {path:"",component:HomeComponent,
  children:[
    {
      path:'viewmarks',
      component:ViewmarksComponent
  },
  {
    path:'feesstatus',
    component:FeesstatusComponent
  },
  {
    path:'attendencestatus',
    component:AttendencestatusComponent
  },
  {
    path:'myprofile',
    component:EditprofileComponent
  },
  {
    path:'notifications',
    component:NotificationsComponent
  },
  {
    path:'request',
    component:RequestComponent
  },
  {
    path:'logout',
    component:LogoutComponent
  }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
