import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  request!: Login[];
  
 
 
header = new HttpHeaders({
    // "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2MjI2ZjEwM2U2M2VjNDA4NjNhYzAyYzUiLCJ1c2VySWQiOjEsImlhdCI6MTY0NjcxOTIzNSwiZXhwIjoxNjQ2ODA1NjM1fQ.LR_-ZcW1h8Qdwm_8LdU4O-0g9H55JtOH-raHT2KaVyk"
    "Authorization": localStorage.getItem('Authorization') || ""
   
  })


  constructor(private httpclient: HttpClient) {


  }

  // 

  loginData(request: Login) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/local",request,).pipe(
      map(
        (res => {
          return res
        })))
  }
  addUserData(data: any) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/user",data,{headers:this.header}).pipe(
      map(
        (res => {
          return res
        })))
  }
  getList() {
    return this.httpclient.get<any>("http://web.newagesme.com:3636/user?offset=0&limit=-1&populate=%5B%22role%22%5D",{headers:this.header}).pipe(
      map(
        (res) => {
          return res.data.users
        }))
  }

  getRoles(){
    return this.httpclient.get<any>("http://web.newagesme.com:3636/role",{headers:this.header}).pipe(
      map(
        (res => {
          return res
        })))
  }
  editList(data: any, id: number) {

    return this.httpclient.put<any>("http://web.newagesme.com:3636/user/"+id,data,{headers:this.header}).pipe(
      map(
        (res) => {
          return res
        }))
  }
  deleteList(id: number) {
    return this.httpclient.delete<any>("http://web.newagesme.com:3636/user/"+id, {headers:this.header}).pipe(
      map(
        (res) => {
          return res
        }))
  }
  loggedinDetails(){
    return this.httpclient.get<any>("http://web.newagesme.com:3636/user/me",{headers:this.header}).pipe(
      map(
        (res) => {
          return res.data.user
        }))
  }
  updateLoggedinDetails(data:any){
    return this.httpclient.put<any>("http://web.newagesme.com:3636/user/me",data,{headers:this.header}).pipe(
      map(
        (res) => {
          return res
        }))
  }
  changeUserPassword(data:any){
    return this.httpclient.put<any>("http://web.newagesme.com:3636/user/password",data,{headers:this.header}).pipe(
      map(
        (res) => {
          return res
        }))
  }

  }

   



