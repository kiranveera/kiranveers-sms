import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sendnotifications',
  templateUrl: './sendnotifications.component.html',
  styleUrls: ['./sendnotifications.component.css']
})
export class SendnotificationsComponent implements OnInit {

  constructor(private service:MainService , private httpclient:HttpClient) { }
  a:any[]=[]
    ngOnInit() {
    }
    notification(x)
    {
     
        if (x.notification=="" )
        {
          alert("fill the above field with valid information")
        }
        else {
      

      this.a.push(x)
      console.log(this.a)
      this.service.sendnotificationtoservice(this.a)
      this.httpclient.post('/admin/noti',x).subscribe((res)=>
      {
        alert(res['message'])
      })
        }}
  }