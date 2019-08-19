import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private service: MainService, private http: HttpClient) { }
  c: any
  d: any

  data: any[] = []
  loggedUser;
  ngOnInit() {
    this.http.get('/admin/getrequest').subscribe(data => {
      if (data['message']=='unauthorized access')
      {
        alert(['unauthorized access'])
      }
      this.data = data['message']
    })
  }
  accept(rollnumber) {
    this.loggedUser = this.service.sendLoggedUser();
    this.http.post('/admin/saveresponse', ({ "message": "request is accepted", "rollnumber": rollnumber })).subscribe((res) => {
      alert(res['message'])
      this.http.get('/admin/getrequest').subscribe(data => {
        this.data = data['message']
      })
    })

  }
  b:boolean=false
  reject(){
    this.b=true
  }
  rejectreason(x,rollnumber) {
    this.loggedUser = this.service.sendLoggedUser(); 
    x.rollnumber=rollnumber
    x.message= "request is rejected"
    this.b=false;
    this.http.post('/admin/saveresponse',x).subscribe((res) => {
      alert(res['message'])
      this.http.get('/admin/getrequest').subscribe(data => {
        this.data = data['message']
      })
    })
  }
}