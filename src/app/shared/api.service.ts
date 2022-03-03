import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient) { }

  postLoginData(data:any){
    return this.httpclient.post<any>("http://web.newagesme.com:3010/user/login",data).pipe(
      map(
        (res=>{
          return res
        })))
 
  }


}
