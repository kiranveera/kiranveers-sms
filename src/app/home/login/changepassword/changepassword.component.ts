import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private hc:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  changepwd(z)
  {
    this.hc.put('/admin/changepassword',z).subscribe((res)=>{
      if(res['message']=='password changed')
      {
        alert(res['message'])
        this.router.navigate(['/home/login'])
      }
      alert(res['message'])
     
    })
  }
}
