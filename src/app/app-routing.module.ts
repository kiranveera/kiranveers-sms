import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';

import { LoginComponent } from './home/login/login.component';
import { ForgotpasswordComponent } from './home/login/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './home/login/changepassword/changepassword.component';
import { OtpComponent } from './home/login/otp/otp.component';


const routes: Routes = [
  {path:'home',
   component:HomeComponent,
   children:[
     {
       path:'',
       redirectTo:'aboutus',
       pathMatch:'full'
     },
   
    {
      path:'aboutus',
      component:AboutusComponent
    },
    
    {
      path:'login',
      component:LoginComponent,
      
    },
    {
      path:'forgotpassword',
      component:ForgotpasswordComponent
    },{
      path:'changepassword',
      component:ChangepasswordComponent
    },{
      path:'otp',
      component:OtpComponent
    },
    
   ]
  },
  
  
  {path:"admin",loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)},
  {path:"student",loadChildren:()=>import('./student/student.module').then(mod=>mod.StudentModule)},
  {path:'',redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
