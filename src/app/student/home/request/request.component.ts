import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  accept: any[]
  b: boolean = true
  loggedUser;
  user;
  constructor(private service: MainService, private http: HttpClient) { }

  ngOnInit() {
    this.user = this.service.sendLoggedUser()
    this.service.viewSpecificrequest(this.user).subscribe(accept => {
      this.accept = accept['message']
    })
  }
  leaverequest(x) {
    this.loggedUser = this.service.sendLoggedUser()
    x.rollnumber = this.loggedUser.rollnumber;
    console.log(x)
    console.log(this.user)
    this.http.post('/student/saverequest', x).subscribe(res => {
      alert(res["message"])
    })
    this.b = false
    this.user = this.service.sendLoggedUser()
    this.service.viewSpecificrequest(this.user).subscribe(accept => {
      this.accept = accept['message']
    })
  }

}
