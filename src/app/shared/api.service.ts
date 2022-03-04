import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Login } from '../login.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  request!: Login[]
  constructor(private httpclient: HttpClient) { }


  loginData(request: Login) {
    return this.httpclient.post<any>("http://web.newagesme.com:3010/user/login", request).pipe(
      map(
        (res => {
          return res
        })))
  }

  getList() {
    return this.httpclient.get<any>("http://web.newagesme.com:3010/user").pipe(
      map(
        (res) => {
          return res.result
        }))
  }

}
