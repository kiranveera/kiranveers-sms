import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
a:any[]=[]
b:any[]=[]
c:any[]=[]
d:any[]=[]
e:any[]=[]
f:any[]=[]
g:any[]=[]
h:any[]=[]
k:any
j:any
m:any
s:any
user;
  constructor(private http:HttpClient) { }
  studentmarks(b)
  {
    console.log(b);
    this.a=b
  }
  sendmarkstostudent()
  {
    return this.a
  }
  studentattendance(d)
  {
    this.c=d
  }
  sendattendancetostudent()
 {
  return this.c
 }
  sendtoservice(f)
 {
  console.log(f)
   this.e=f
}

studentfee()
{
  return this.e
}
sendnotificationtoservice(h)
{
  this.g=h
  console.log(this.g)
}
sendnotificationtonotification()
{
  return this.g
}
sendrequest(j)
{
this.k=j
console.log(this.k)
}
requests()
{
  return this.k
}
ok(l)
{
this.m=l
}
no()
{
  return this.m
}
rej(o)
{
this.s=o
}
rejt()
{
  return this.s
}
// read student profiles

readdata():Observable <any[]>
{
return this.http.get<any[]>('admin/read');
}


// view attendance

viewattendance():Observable <any[]>
{
  return this.http.get<any[]>('student/viewattendance')
}
//view marks
viewmarks():Observable<any[]>
{
  return this.http.get<any[]>('student/viewmarks')
}

//fees status
feesstatus():Observable <any[]>
{
  return this.http.get<any[]>('student/feesstatus')
}
//notifications
notifications():Observable <any[]>
{
  return this.http.get<any[]>('student/notifications')
}

loggedUser(user){
  console.log(user)
  this.user=user[0]
}
sendLoggedUser(){
  return this.user;
}
viewSpecificMarks(user){
  console.log(user)
  return this.http.post<any[]>('student/viewspecificmarks',user)
}
viewSpecificAttendance(user){
  return this.http.post<any[]>('student/viewspecificattendance',user)
}
viewSpecificFees(user){
  return this.http.post<any[]>('student/viewspecficfees',user)
}
viewSpecificProfile(user){
  return this.http.post<any[]>('student/viewspecificprofile',user)

}
viewSpecificrequest(user){
  return this.http.post<any[]>('student/viewspecificrequest',user)
}
}

