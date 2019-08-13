import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from 'src/app/loginservice.service';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private http:HttpClient, private loginservice:LoginserviceService, private mainService:MainService) { }

  ngOnInit()
   {
  }
  onSubmit(x)
    {
      
    console.log(x);
    if(x.user==="admin"){
    this.loginservice.doadminlogin(x).subscribe(res=>{
      if(res["message"]==="Invalid admin"){
        alert("Invalid admin")
      }
      else if(res["message"]==="Invalid admin password")
      {
        alert("wrong password")
      }
      else if (res["message"]==="admin success"){
        alert("login successfully")
          localStorage.setItem("idtoken",res['token'])
          this.router.navigate(["/admin/studentprofiles"])
      }
    })
    }

    else if (x.user==="student"){
      this.loginservice.dologin(x).subscribe(res=>{
        if (res["message"]==="invalid user")
        {
          alert("invalid user")
        }
        if (res["message"]==="invalid password")
        {
          alert("wrong password enter correct password")
        }
        if (res["message"]==="success")
        {
          alert("login successfully")
          localStorage.setItem("idtoken",res['token'])
          this.mainService.loggedUser(res['data'])
          this.router.navigate(["/student/myprofile"])
        }
      })
      
    }
   
  }

}
