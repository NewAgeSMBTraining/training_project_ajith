import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { map } from 'rxjs';
import { Login } from '../model/login.model';
import { Forgotpassword } from '../model/forgotpassword.model';
import { Queryparams } from '../model/queryparams.model';
import { AuthorizationService } from '../guard/authorization.service';
import { Otpverify } from '../model/otpverify.model';
import { ApiResponse} from '../model/apiresponse.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = 'http://web.newagesme.com:3636'
  request!: Login[];
  
  //Used to generate query(Adding query to URL)
  generateQueryUrl(path: string, options?: Queryparams) {
    let url = `${this.apiBaseUrl}/${path}?`;
    if (typeof options === 'undefined') { return url; }
    if (!isNaN(Number(options.limit))) { url += 'limit=' + options.limit + '&'; }
    if (!isNaN(Number(options.offset))) { url += 'offset=' + options.offset + '&'; }
    if (options.populate && Array.isArray(options.populate)) { url += 'populate=' + JSON.stringify(options.populate) + '&'; }
    if (options.data && typeof options.data === 'object') {
      for (const key in options.data) {
        if (options.data.hasOwnProperty(key)) {
          url += `${key}=${options.data[key]}&`;
        }
      }
    }
    return url;
  }
 
header = new HttpHeaders({
    
    "Authorization": localStorage.getItem('Authorization') || ""
   
  })


  constructor(private httpclient: HttpClient, private authservice:AuthorizationService, private httpservice:HttpService) {


  }

  

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
  //Normal service
  // getList() {
    
  //   return this.httpclient.get<any>("http://web.newagesme.com:3636/user?offset=0&limit=-1&populate=%5B%22role%22%5D",{headers:this.header}).pipe(
  //     map(
  //       (res) => {
  //         return res.data.users
  //       }))
  // }

  //service using async
  async getList(url: string, options?: Queryparams):Promise<ApiResponse> {
    try {
      const response = await this.httpservice.get(this.generateQueryUrl(url, options),{headers:this.header} );
      return response
      
      
    } 
    catch (e) {
    return this.errorHandler(e);
    
    }
    
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
  forgotPassword(data:Forgotpassword){
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/password/forgot",data).pipe(
      map((
        res=>{
          return res
        }
      ))
    )
  }
otpVerification(data:Otpverify){
  return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/otp/verify",data).pipe(
    map((
      res=>{
        return res
      }
    ))
  )
}

  errorHandler(e: any): any {
    if (e instanceof HttpErrorResponse) {
      return e.status ? { error: e.error, message: e.error?.message || 'network error' } : { error: e, message: 'network error' };
    } else {
      return { error: e, message: e.message || 'error' };
    }
  }
  }

   



