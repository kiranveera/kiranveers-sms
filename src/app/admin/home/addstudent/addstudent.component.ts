import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/main.service';
@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  constructor(private service: MainService, private httpclient: HttpClient) { }
  ngOnInit() { }


  addstudent(a) {
    if (a.rollno == "" || a.studentname == "" || a.class == "" || a.password == "") {
      alert("fill the all fields with valid information")
    }
    else {
  
      this.httpclient.post('/admin/send', a).subscribe((res) => {
        alert(res['message'])
      })
    }
  }


}
