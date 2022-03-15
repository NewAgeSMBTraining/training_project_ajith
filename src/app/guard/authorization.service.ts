import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  isLoggedin(){
    const token = localStorage.getItem('Authorization') || ""
    return token;
  }
  getToken(){
    const token = localStorage.getItem('Authorization') || ""
    return token;
  }
}
