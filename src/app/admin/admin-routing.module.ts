import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostmarksComponent } from './home/postmarks/postmarks.component';
import { PostattendenceComponent } from './home/postattendence/postattendence.component';
import { UpdatefeesComponent } from './home/updatefees/updatefees.component';
import { StudentprofilesComponent } from './home/studentprofiles/studentprofiles.component';
import { SendnotificationsComponent } from './home/sendnotifications/sendnotifications.component';
import{AddstudentComponent} from './home/addstudent/addstudent.component'
import { RequestsComponent } from './home/requests/requests.component';
import { LogoutComponent} from './home/logout/logout.component'
import { from } from 'rxjs';

const routes: Routes = [
  {path:"",component:HomeComponent,
  children:[
    {
      path:'postmarks',
      component:PostmarksComponent
  },
  {
    path:'postattendence',
    component:PostattendenceComponent
  },
  {
    path:'updatefees',
    component:UpdatefeesComponent
  },
  {
    path:'studentprofiles',
    component:StudentprofilesComponent
  },
  {
    path:'sendnotifications',
    component:SendnotificationsComponent
  },
  {
    path:'requests',
    component:RequestsComponent
  },
  {
    path:'addstudent',
    component:AddstudentComponent
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
export class AdminRoutingModule { }
