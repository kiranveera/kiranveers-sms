import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postattendence',
  templateUrl: './postattendence.component.html',
  styleUrls: ['./postattendence.component.css']
})
export class PostattendenceComponent implements OnInit {

  constructor(private service:MainService ,private httpclient:HttpClient) { }
  x:any[]=[]
  b3:boolean=false;
objecttomodify3:object;
    ngOnInit()
   {
    this.service.viewattendance().subscribe(x=>{
      this.x=x['message']
      
    })
    
   }
    sattendance(x)
    {
      if (x.rollno=="" || x.studentname=="" || x.attendancemonth=="" || x.attendanceformonth=="" || x.totalattendance=="")
      {
        alert("fill the all fields with valid information")
      }
      else {
     
      this.httpclient.post('/admin/attendance',x).subscribe((res)=>
        {
                alert(res['message'])
        })
        this.service.viewattendance().subscribe(x=>{
          this.x=x['message']
          
        })}
    }
     //delete attendance
   deletestudent(rollnumber)
   {
     console.log(rollnumber)
     
     this.httpclient.delete(`/admin/deleteattendance/${rollnumber}`).subscribe((res)=>
     {
       alert(res['message']);
       this.x=res['data']
     })
   
   }

   //update attendance

   updateatt(attendance)
   {
      this.objecttomodify3=attendance;
      console.log(this.objecttomodify3)
      this.b3=true
    }
    onsubmit3(modifyobject)
   {
      this.b3=false
      this.httpclient.put('/admin/updateatt',modifyobject).subscribe((res)=>{
      alert(res['message'])
       })
   }

    
  }
  