import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  sendotp(x)
  {
    this.http.post('/admin/forgotpassword',x).subscribe((res)=>
    {
      alert(res['message'])
      if(res['message']=="user found")
      {
        this.router.navigate(['/home/otp'])
      }
      else
      {
        this.router.navigate(['/home/forgotpassword'])
      }
    })
}
}
