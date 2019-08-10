import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postmarks',
  templateUrl: './postmarks.component.html',
  styleUrls: ['./postmarks.component.css']
})
export class PostmarksComponent implements OnInit {
marks:any[]=[];
b1:boolean=false;
objecttomodify1:object;
search:any;
  constructor(private service:MainService ,private httpclient:HttpClient) { }

  ngOnInit()
 {
  this.service.viewmarks().subscribe(marks=>{
    this.marks=marks['message']
    
  })
  }

  postmarks(y){
    if (y.rollno=="" || y.studentname=="" || y.SUBJECTNAME=="" || y.MARKS=="" || y.TOTALMARKS=="")
    {
      alert("fill the all fields with valid information")
    }
    else {
    this.httpclient.post('/admin/marks',y).subscribe(res=>{
      alert(res['message'])
      this.marks=res['data']
    })}
  }


//delete operation
  deletestudent(rollnumber)
  {
    
    
    this.httpclient.delete(`/admin/deletemarks/${rollnumber}`).subscribe((res)=>
    {
      alert(res['message']);
      this.marks=res['data']
    })
  
  }
  //update marks
  updatemarks(marks)
{
  this.objecttomodify1=marks;
 
  this.b1=true
}
onsubmit1(modifyobject)
{
  this.b1=false
  this.httpclient.put('/admin/updatemarks',modifyobject).subscribe((res)=>{
    alert(res['message'])
  })
}
}




